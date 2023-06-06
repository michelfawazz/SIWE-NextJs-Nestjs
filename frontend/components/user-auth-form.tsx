"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
// import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { useEffect } from "react"




import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { setCookie } from '@/lib/cookies'
import useAxiosAuth from "@/hooks/useAxiosAuth"
import { verifySiwe } from "@/lib/message"
import { useRouter } from "next/navigation"


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }


//create userAuth schema which consists of username and address

const userAuthSchema = z.object({
  username: z.string().min(1, "Username is required"),
})

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
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
    const { messageToSign, nonce } = await verifySiwe(address as string)


    const signature = await signMessageAsync(
      {
        message: messageToSign.prepareMessage(),

      }
    )


    try {
      const response = await axiosAuth.post(`/user/signup`, {
        messageToSign: messageToSign.prepareMessage(),
        signature,
        username: data.username,
        ethAddress: address,
        nonce
      })


      //if response is 200 go to profile

      if (response.status === 200) {
        setCookie('access_token', response.data.access_token)
        setCookie('refresh_token', response.data.refresh_token)
        router.push("/profile")

      }
    } catch (err:any) {
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
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="username">
                  UserName
                </Label>
                <Input
                  id="username"
                  placeholder="michel"
                  type="username"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register("username")}
                />
                {errors?.username && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <button className={cn(buttonVariants())} disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign up
              </button>
            </div>
          </form>
        </div>
      ) :
        (
          <button onClick={() => connect()}>Connect</button>
        )

      }




      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true)
          signIn("github", { callbackUrl: "/dashboard" })
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button>


      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGoogleLoading(true)
          signIn("google", { callbackUrl: "/dashboard" })
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        google
      </button> */}
    </div>
  )
}