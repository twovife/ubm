import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import useFilter from "@/Hooks/useFilter";
import DefaultTable from "@/Components/DefaultTable";
import Paginasi from "@/Components/Paginasi";
import Search from "@/Components/Search";
import FilterBox from "@/Components/FilterBox";
import Create from "./Create";

const Index = ({ server_filter, datas, ...props }) => {
    const [loading, setLoading] = useState(false);
    const {
        showFilter,
        setShowFilter,
        filter,
        whenFilterrAdding,
        addFilter,
        setAddFilter,
        removeFilter,
        returnedData,
        currentPage,
        totalPages,
        handlePageChange,
    } = useFilter(datas, 10, "employee_index");

    const [isShowCreate, setIsShowCreate] = useState(false);
    const onCreateButtonClicked = () => {
        setIsShowCreate(!isShowCreate);
    };

    return (
        <Authenticated loading={loading} judul="Daftar Karyawan">
            <FilterBox
                show={showFilter}
                setShow={setShowFilter}
                whenFilterrAdding={whenFilterrAdding}
                addFilter={addFilter}
                setAddFilter={setAddFilter}
            />
            <Card judul="Daftar Karyawan">
                <Card.subTitle>
                    <div className="flex lg:flex-row flex-col lg:justify-between items-center gap-3">
                        <Card.startContent className={`flex-wrap mb-3 lg:mb-0`}>
                            <Card.filterItem
                                filter={filter}
                                removeFilter={removeFilter}
                            />
                        </Card.startContent>
                        <Card.endContent className={`flex-wrap`}>
                            <Search
                                loading={loading}
                                setLoading={setLoading}
                                urlLink={route("emp.index")}
                                localState={"employee_index"}
                                availableBranch={true}
                            >
                                <PrimaryButton
                                    className="block"
                                    title={"Tambah Baru"}
                                    onClick={onCreateButtonClicked}
                                />
                            </Search>
                        </Card.endContent>
                    </div>
                </Card.subTitle>
                <DefaultTable>
                    <DefaultTable.thead>
                        <DefaultTable.th
                            type={"nested"}
                            sticky={true}
                            headers={[
                                { name: "No", filterable: "no" },
                                {
                                    name: "Nama",
                                    filterable: "yes",
                                    column: "nama",
                                    type_date: "text",
                                },
                            ]}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{ name: "Status", filterable: "no" }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "NIK",
                                filterable: "yes",
                                column: "nik",
                                type_date: "text",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "Alamat",
                                filterable: "yes",
                                column: "alamat",
                                type_date: "text",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "Tanggal Masuk",
                                filterable: "yes",
                                column: "hire_date",
                                type_date: "date",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "Masa Kerja (th)",
                                filterable: "yes",
                                column: "masa_kerja",
                                type_date: "number",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "Unit",
                                filterable: "yes",
                                column: "unit",
                                type_date: "text",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "Jabatan",
                                filterable: "yes",
                                column: "jabatan",
                                type_date: "text",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "Jenis Jaminan",
                                filterable: "yes",
                                column: "janis_jaminan",
                                type_date: "text",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "Tanggal Pindah",
                                filterable: "yes",
                                column: "tanggal_perpindahan",
                                type_date: "date",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "Keterangan Pindah",
                                filterable: "yes",
                                column: "keterangan_perpindahan",
                                type_date: "text",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "History Pindah",
                                filterable: "yes",
                                column: "history_perpindahan",
                                type_date: "text",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "Tanggal Berhenti",
                                filterable: "yes",
                                column: "date_resign",
                                type_date: "date",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "Keterangan Berhenti",
                                filterable: "yes",
                                column: "resign_status",
                                type_date: "text",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "Pencairan Simp.Wjb",
                                filterable: "yes",
                                column: "pencairan_simpanan_w_date",
                                type_date: "date",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "Petugas",
                                filterable: "yes",
                                column: "pencairan_simpanan_w_by",
                                type_date: "text",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "Pencairan Simp.Sukarela",
                                filterable: "yes",
                                column: "pencairan_simpanan_date",
                                type_date: "date",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "Petugas",
                                filterable: "yes",
                                column: "pencairan_simpanan_by",
                                type_date: "text",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "Pengembalian Jaminan",
                                filterable: "yes",
                                column: "handover_jaminan",
                                type_date: "date",
                            }}
                        />
                        <DefaultTable.th
                            type={"default"}
                            headers={{
                                name: "Petugas",
                                filterable: "yes",
                                column: "handover_jaminan_by",
                                type_date: "text",
                            }}
                        />
                    </DefaultTable.thead>
                    <tbody className="divide-y divide-gray-200 relative z-0 text-xs">
                        {returnedData &&
                            returnedData.map((item, key) => (
                                <tr
                                    key={key}
                                    className="odd:bg-white even:bg-gray-100 hover:bg-roman-50"
                                >
                                    <td className="sticky left-0 top-0 z-10 bg-inherit">
                                        <div className="grid grid-cols-5 gap-1">
                                            <div className="col-span-1 px-3 py-1.5 whitespace-nowrap text-center">
                                                <Link
                                                    href={route(
                                                        "emp.show",
                                                        item.id
                                                    )}
                                                    className="text-blue-500 hover:bg-blue-500 hover:text-white  focus:bg-blue-500 focus:text-white text-center px-1 py-0.5 rounded"
                                                >
                                                    <span>{key + 1}</span>
                                                    <span className="hidden lg:inline-block ml-2">
                                                        Edit
                                                    </span>
                                                </Link>
                                            </div>
                                            <div className="col-span-4 px-3 py-1.5 whitespace-nowrap">
                                                {item.nama}
                                            </div>
                                        </div>
                                    </td>
                                    <td
                                        className={`px-3 py-1.5 whitespace-nowrap`}
                                    >
                                        {item.status_karyawan == "Aktif" ? (
                                            <div className="bg-green-500 text-white text-center px-2 py-1 rounded">
                                                {item.status_karyawan}
                                            </div>
                                        ) : item.status_karyawan == "Resign" ? (
                                            <div className="bg-amber-400 text-white text-center px-2 py-1 rounded">
                                                {item.status_karyawan}
                                            </div>
                                        ) : item.status_karyawan == "Pecat" ? (
                                            <div className="bg-black text-white text-center px-2 py-1 rounded">
                                                {item.status_karyawan}
                                            </div>
                                        ) : item.status_karyawan ==
                                          "belum-lengkap" ? (
                                            <div className="bg-blue-500 text-white text-center px-2 py-1 rounded">
                                                {item.status_karyawan}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </td>
                                    <td className="px-3 py-1.5 whitespace-nowrap">
                                        {item.nik}
                                    </td>
                                    <td className="px-3 py-1.5">
                                        <div className="w-44">
                                            {item.alamat}
                                        </div>
                                    </td>
                                    <td className="px-3 py-1.5 w-36 whitespace-nowrap">
                                        {item.hire_date
                                            ? dayjs(item.hire_date).format(
                                                  "DD-MM-YYYY"
                                              )
                                            : "-"}
                                    </td>
                                    <td className="px-3 py-1.5 w-36 whitespace-nowrap">
                                        {`${item.masa_kerja} Th`}
                                    </td>
                                    <td className="px-3 py-1.5 w-36 whitespace-nowrap">
                                        {item.unit}
                                    </td>
                                    <td className="px-3 py-1.5 w-36 whitespace-nowrap">
                                        {item.jabatan}
                                    </td>
                                    <td className="px-3 py-1.5 w-36 whitespace-nowrap text-xs">
                                        {item.janis_jaminan}
                                    </td>

                                    <td
                                        scope="col"
                                        className="px-3 py-1.5 whitespace-nowrap"
                                    >
                                        {item.tanggal_perpindahan
                                            ? dayjs(
                                                  item.tanggal_perpindahan
                                              ).format("DD-MM-YYYY")
                                            : ""}
                                    </td>
                                    <td scope="col" className="px-3 py-1.5">
                                        {item.keterangan_perpindahan}
                                    </td>
                                    <td
                                        scope="col"
                                        className="px-3 py-1.5 whitespace-nowrap"
                                    >
                                        {item.history_perpindahan}
                                    </td>
                                    <td
                                        scope="col"
                                        className="px-3 py-1.5 whitespace-nowrap"
                                    >
                                        {item.date_resign
                                            ? dayjs(item.date_resign).format(
                                                  "DD-MM-YYYY"
                                              )
                                            : ""}
                                    </td>
                                    <td scope="col" className="px-3 py-1.5">
                                        {item.resign_status}
                                    </td>
                                    <td
                                        scope="col"
                                        className="px-3 py-1.5 whitespace-nowrap"
                                    >
                                        {item.pencairan_simpanan_date
                                            ? dayjs(
                                                  item.pencairan_simpanan_date
                                              ).format("DD-MM-YYYY")
                                            : ""}
                                    </td>
                                    <td scope="col" className="px-3 py-1.5">
                                        {item.pencairan_simpanan_by}
                                    </td>

                                    <td
                                        scope="col"
                                        className="px-3 py-1.5 whitespace-nowrap"
                                    >
                                        {item.pencairan_simpanan_w_date
                                            ? dayjs(
                                                  item.pencairan_simpanan_w_date
                                              ).format("DD-MM-YYYY")
                                            : ""}
                                    </td>
                                    <td scope="col" className="px-3 py-1.5">
                                        {item.pencairan_simpanan_w_by}
                                    </td>

                                    <td
                                        scope="col"
                                        className="px-3 py-1.5 whitespace-nowrap"
                                    >
                                        {item.handover_jaminan
                                            ? dayjs(
                                                  item.handover_jaminan
                                              ).format("DD-MM-YYYY")
                                            : ""}
                                    </td>
                                    <td scope="col" className="px-3 py-1.5">
                                        {item.handover_jaminan_by}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </DefaultTable>
                <Paginasi
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <Create
                    show={isShowCreate}
                    setShow={onCreateButtonClicked}
                    setLoading={setLoading}
                />
            </Card>
        </Authenticated>
    );
};

export default Index;
