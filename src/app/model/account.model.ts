export interface AccountDetails {
    id: string;
    balance: number;
    type: string;
    createdAt: Date;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    accountOperationDTOS: AccountOperation[];
}

export interface AccountOperation {
    id: number;
    operationDate: Date;
    amount: number;
    type: string;
    description: string;
}
