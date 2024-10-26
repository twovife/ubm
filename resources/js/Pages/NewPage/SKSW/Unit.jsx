import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import TableDetailPerbulan from "./Components/TableDetailPerbulan";
import Card from "@/Components/Card";
import Search from "@/Components/Search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";

const Unit = ({ branch, server_filters, batch_datas, ...props }) => {
    const [loading, setLoading] = useState(false);
    const [savedTabs, setSavedTabs] = useState(null);

    const saveToLocalStorage = (value) => {
        localStorage.setItem("tabsActive_sksw_perunit_index", value);
        setSavedTabs(value);
    };

    useEffect(() => {
        const loadedText = localStorage.getItem(
            "tabsActive_sksw_perunit_index"
        );
        const hasZeroBranchId = batch_datas?.some(
            (item) => item.branch_id == loadedText
        );
        const minBranchId = Math.min(
            ...batch_datas?.map((item) => item.branch_id)
        );

        setSavedTabs(hasZeroBranchId ? parseInt(loadedText) : minBranchId);
    }, []);

    return (
        <Authenticated loading={loading}>
            <Card judul="SKSW Per Unit">
                <div className="w-full">
                    <Tabs
                        // defaultValue={savedTabs}
                        className="w-full"
                        value={savedTabs}
                    >
                        <div className="flex flex-col justify-between lg:flex-row">
                            <TabsList className="flex flex-wrap justify-start w-full gap-3 bg-transparent">
                                {batch_datas.length > 0
                                    ? batch_datas.map((item, i) => (
                                          <TabsTrigger
                                              onClick={() =>
                                                  saveToLocalStorage(
                                                      item.branch_id
                                                  )
                                              }
                                              value={item.branch_id}
                                              className="border"
                                          >
                                              {item.unit}
                                          </TabsTrigger>
                                      ))
                                    : null}
                            </TabsList>
                            <div className="w-full ">
                                <Search
                                    loading={loading}
                                    setLoading={setLoading}
                                    urlLink={route("sksw.unit")}
                                    localState={"sksw_unit"}
                                    FilterWilayahOnly={true}
                                    availableMonth={true}
                                />
                            </div>
                        </div>
                        <>
                            {batch_datas.length > 0
                                ? batch_datas.map((item, i) => (
                                      <TabsContent value={item.branch_id}>
                                          <TableDetailPerbulan
                                              data={item}
                                              loading={loading}
                                              setLoading={setLoading}
                                          />
                                      </TabsContent>
                                  ))
                                : null}
                        </>
                    </Tabs>
                </div>
            </Card>
        </Authenticated>
    );
};

export default Unit;
