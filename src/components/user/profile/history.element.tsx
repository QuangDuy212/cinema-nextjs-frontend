"use client"
import dayjs from 'dayjs';
import { useEffect, useState } from 'react'
import 'src/styles/profile/history.element.scss'
import { callFetchAllBillByUser, callFetchHistoryByUser } from 'src/util/api';
import { limitText } from 'src/util/method';
const HistoryElement = () => {
    const [history, setHistory] = useState<IHistory[]>([]);
    const [isClient, setIsClient] = useState<boolean>(false);


    let isMobile = false;
    if (typeof window !== "undefined") {
        isMobile = window?.matchMedia("(max-width: 1200px)")?.matches;// check mobile device
    }

    useEffect(() => {
        const fetchHistory = async () => {
            const res = await callFetchHistoryByUser("?page=1&size=1000");
            setHistory(res?.data?.result);
        }
        fetchHistory();
        setIsClient(true)
    }, [])
    return (
        <>
            {isClient &&
                <div className="history-container">
                    <table >
                        <tr>
                            <th style={{ padding: 4 }}>Ngày</th>
                            <th style={{ padding: 4 }}>Phim</th>
                            <th style={{ padding: 4 }}>Số vé</th>
                            <th style={{ padding: 4 }}>Số tiền</th>
                        </tr>
                        {history?.map((i) => {
                            return (
                                <tr key={i.id}>
                                    <td style={{ padding: 4 }}>
                                        {!isMobile ? dayjs(`${i.createdAt}`).format('DD/MM/YYYY')
                                            : dayjs(`${i.createdAt}`).format('DD/MM')
                                        }
                                    </td>
                                    <td style={{ padding: 4 }}>{isMobile ? limitText(i.nameFilm ?? "", 20) : i.nameFilm}</td>
                                    <td style={{ padding: 4 }}>{i.quantity}</td>
                                    <td style={{ padding: 4 }}>{i.total}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            }
        </>
    )
}
export default HistoryElement;