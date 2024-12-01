export interface Permission {
  screenId: string;
  actions: ('view' | 'create' | 'edit' | 'delete')[];
}

export interface Role {
  id: string;
  code: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  permissions: Permission[];
}