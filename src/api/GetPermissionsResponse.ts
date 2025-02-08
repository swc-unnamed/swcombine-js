export interface GetPermissionsResponse {
  permissions: {
    permission: GetPermissionsResponsePermission[]
  }
}

export interface GetPermissionsResponsePermission {
  attributes: GetPermissionsResponsePermissionAttributes
}

export interface GetPermissionsResponsePermissionAttributes {
  name: string
  description: string
  inherits: string
}
