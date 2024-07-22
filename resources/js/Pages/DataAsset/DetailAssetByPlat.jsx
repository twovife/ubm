import React, { useEffect, useState } from "react";

const DetailAssetByPlat = ({ triggeredId }) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (triggeredId === null) {
            return;
        }
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    route("goroumrah.requestWilayahTransaction"),
                    {
                        params: {
                            wilayah: triggerId,
                            bulan: server_filter.bulan,
                        },
                        signal: controller.signal,
                    }
                );
                // console.log();
                setData(response.data.data);
            } catch (error) {
                setData(null);
                if (axios.isCancel(error)) {
                    console.log("Request canceled:", error.message);
                } else {
                    setLoading(false);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup function to abort the request if triggerId changes
        return () => {
            controller.abort();
        };
    }, [triggeredId]);

    return (
        <div>
            <div className="p-3">{triggeredId}</div>
        </div>
    );
};

export default DetailAssetByPlat;
