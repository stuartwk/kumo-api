
export interface RoomData {
    id: string;
    name: string;
    isPrivate: boolean;
    invoiceId: string;
    createdAt: Date;
}

export interface RoomRO {
    room: RoomData;
}
