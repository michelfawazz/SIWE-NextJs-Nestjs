"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"





import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { setCookie } from '@/lib/cookies'
import useAxiosAuth from "@/hooks/useAxiosAuth"
import { verifySiwe } from "@/lib/message"
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }


//create userAuth schema which consists of username and address

const userAuthSchema = z.object({

})

type FormData = z.infer<typeof userAuthSchema>

export function UserLoginAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();


  const axiosAuth = useAxiosAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)




  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage()



  //on connect wallet sign message



  const signMessage = async (data: FormData) => {
    const { messageToSign, nonce } = await verifySiwe(
      address as string,
    )


    const signature = await signMessageAsync(
      {
        message: messageToSign.prepareMessage(),

      }
    )

    try {
      const response = await axiosAuth.post(`/user/signin`, {
        messageToSign: messageToSign.prepareMessage(),
        signature,
        ethAddress: address,
        nonce
      })

      console.log(response.data, "resss")





      //if response is 200 go to profile

      if (response.status === 200) {
        setCookie('access_token', response.data.access_token)
        setCookie('refresh_token', response.data.refresh_token)
        router.push("/profile")

      }
    }
    catch (err: any) {
      alert(err.response.data)
    }


  }












  return (
    <div className={cn("grid gap-6", className)} {...props}>


      {isConnected ? (
        <div>
          Connected to {address}
          <form onSubmit={handleSubmit(signMessage)}>
            <div className="grid gap-2">
              <button className={cn(buttonVariants())} disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login
              </button>
            </div>
          </form>
        </div>
      ) :
        (
          <button onClick={() => connect()}>Connect</button>
        )

      }




      
    </div>
  )
}