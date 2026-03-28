
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import AzureAD from "next-auth/providers/azure-ad"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        AzureAD({
            clientId: process.env.AZURE_AD_CLIENT_ID,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            // @ts-expect-error: tenantId is required for Azure AD but types might be mismatching in beta
            tenantId: process.env.AZURE_AD_TENANT_ID,

        }),
    ],
    pages: {
        signIn: "/login",
    },
})
