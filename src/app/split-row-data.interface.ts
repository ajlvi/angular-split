export interface SplitRowData {
    split_name: string;
    split_data: number | 'x';
    pb_data: number | 'x';
    is_gold_split: boolean;
}

export const DummySplitRowData: SplitRowData = {
    split_name: "",
    split_data: 'x',
    pb_data: 'x',
    is_gold_split: false
}