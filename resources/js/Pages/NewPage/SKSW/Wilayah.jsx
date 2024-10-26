import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import Card from "@/Components/Card";
import Search from "@/Components/Search";
import TableGlobalPerbulan from "./Components/TableGlobalPerbulan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";

const Wilayah = ({ server_filter, batch_datas, ...props }) => {
    const [savedTabs, setSavedTabs] = useState(0);

    const saveToLocalStorage = (value) => {
        localStorage.setItem("tabsActive_unitsaving_index", value);
        setSavedTabs(value);
    };

    useEffect(() => {
        const loadedText = localStorage.getItem("tabsActive_unitsaving_index");
        setSavedTabs(parseInt(loadedText) || 0);
    }, []);

    const [loading, setLoading] = useState(false);

    return (
        <Authenticated loading={loading}>
            <Card judul="SKSW Per Wilayah">
                <Tabs
                    // defaultValue={savedTabs}
                    className="w-full"
                    value={savedTabs}
                >
                    <div className="flex justify-between">
                        <TabsList>
                            {batch_datas.length > 0
                                ? batch_datas.map((item, i) => (
                                      <TabsTrigger
                                          onClick={() =>
                                              saveToLocalStorage(item.wilayah)
                                          }
                                          value={item.wilayah}
                                          className="ml-3 first:ml-0"
                                      >
                                          {item.wilayah}
                                      </TabsTrigger>
                                  ))
                                : null}
                        </TabsList>
                        <Search
                            loading={loading}
                            setLoading={setLoading}
                            urlLink={route("sksw.wilayah")}
                            localState={"sksw_wilayah"}
                            availableMonth={true}
                        />
                    </div>

                    <>
                        {batch_datas.length > 0
                            ? batch_datas.map((item, i) => (
                                  <TabsContent value={item.wilayah}>
                                      <TableGlobalPerbulan
                                          data={item}
                                          loading={loading}
                                          setLoading={setLoading}
                                      />
                                  </TabsContent>
                              ))
                            : null}
                    </>
                </Tabs>
            </Card>
            <div className="mx-auto mb-6 sm:px-6 lg:px-8"></div>
        </Authenticated>
    );
};

export default Wilayah;
