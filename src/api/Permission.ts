export interface Permission {
  name: string
  description: string
  inheritedPermissions: Permission[]
}
