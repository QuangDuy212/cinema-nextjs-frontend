"use client"
import dayjs from 'dayjs';
import { useEffect, useState } from 'react'
import 'src/styles/profile/history.element.scss'
import { callFetchAllBillByUser } from 'src/util/api';
const HistoryElement = () => {
    const [history, setHistory] = useState<IHistory[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const res = await callFetchAllBillByUser(1, 100);
            setHistory(res?.data?.result);
        }
        fetchHistory();
    }, [])
    return (
        <>
            <div className="history-container">
                <table>
                    <tr>
                        <th>Ngày</th>
                        <th>Phim</th>
                        <th>Số vé</th>
                        <th>Số tiền</th>
                    </tr>
                    {history?.map((i) => {
                        return (
                            <tr key={i.id}>
                                <td>{dayjs(`${i.createdAt}`).format('DD/MM/YYYY')}</td>
                                <td>{i.nameFilm}</td>
                                <td>{i.quantity}</td>
                                <td>{i.total}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </>
    )
}
export default HistoryElement;