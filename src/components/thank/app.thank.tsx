"use client"

import { Button, Result } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AppThank = () => {
    const router = useRouter();
    return (
        <>
            <div style={{ minHeight: "100vh", padding: "112px 0 40px", backgroundColor: "#10151b", color: "#fff" }}>

                <Result
                    style={{ color: "#fff" }}
                    status="success"
                    title={<span style={{ color: "#fff" }}>Mua vé xem phim thành công</span>}
                    subTitle={<span style={{ color: "#fff" }}>Cảm ơn vì đã chọn chúng tôi</span>}
                    extra={[
                        <Link href="/" key={1}
                            style={{
                                borderRadius: "12px",
                                padding: "8px 20px",
                                color: "#fff",
                                backgroundColor: "#eb212b",
                                fontSize: "14px", border: "none"
                            }}
                        >
                            Homepage
                        </Link>
                    ]

                    }
                />
            </div>
        </>
    )
}
export default AppThank;