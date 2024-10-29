import SignIn from '@/components/auth/SignIn'
import SignUp from '@/components/auth/SignUp'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AuthPage() {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center my-20">
            <Tabs defaultValue="sign-in" className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="sign-in" className="font-bold">
                        Sign In
                    </TabsTrigger>
                    <TabsTrigger value="sign-up" className="font-bold">
                        Sign Up
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="sign-in">
                    <SignIn />
                </TabsContent>

                <TabsContent value="sign-up">
                    <SignUp />
                </TabsContent>
            </Tabs>
        </div>
    )
}
