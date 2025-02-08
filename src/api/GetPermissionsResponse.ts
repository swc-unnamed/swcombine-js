import { SwcApiResponse } from '@/common'

export type GetPermissionsResponse = SwcApiResponse<GetPermissionsResponsePermissions>

export interface GetPermissionsResponsePermissions {
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
