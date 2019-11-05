
export interface Transaction {
    address: string;
    created_at: string; // this is unix timestamp
    settled_at: string; // also unix timestamp
    tx: string; // transaction id,
    status: 'pending' | 'confirmed';
    amount: number;
}
