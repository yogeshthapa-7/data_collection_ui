export const interface AuthState {
    token: string | null
    accessToken: string | null
    refreshToken: string | null
    userGroupCode: string | null
    clientCode: string | null
    userInfo: LoggedInUserData | null
    menus: Menu[] | null
}

