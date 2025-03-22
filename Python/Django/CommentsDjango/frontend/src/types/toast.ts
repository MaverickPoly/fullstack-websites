export interface ToastType {
    text: string,
    type: string,
    id: number
}

export interface ShowToastPayload {
    text: string
}

export interface ToastContextType {
    toasts: ToastType[],
    removeToast: (id: number) => void,
    toastSuccess: (text: string) => void,
    toastWarn: (text: string) => void,
    toastError: (text: string) => void,
    toastInfo: (text: string) => void,
}
