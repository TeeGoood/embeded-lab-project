import { cal1, cal2 } from "./utils";

export function processData(data: any): any {
    const values1 = data.queries[0].results[0].values;
    const values2 = data.queries[0].results[1].values;
    const d1 = values1.map((v: number[]) => {
        return { time: v[0], level: (cal1(v[1])) }
    })
    const d2 = values2.map((v: number[]) => {
        return { time: v[0], level: cal2(v[1]) }
    })
    return [d1, d2]
}