// import InputLabel from "@/Components/InputLabel";
// import PrimaryButton from "@/Components/PrimaryButton";
// import SelectList from "@/Components/SelectList";
// import TextInput from "@/Components/TextInput";
// import { useForm, usePage } from "@inertiajs/react";
// import React, { useState } from "react";

// const PindahUnit = () => {
//     const { branch, employees, title, aset } = usePage().props;
//     const { data, setData, put, processing, errors } = useForm({
//         keterangan_keluar: "",
//         tanggal_keluar: "",

//         jabatan: "",
//         area: 0,
//         branch_id: "",
//     });

//     const onHandleTypeChange = (e) => {
//         const { value, name } = e.target;
//         setData(name, value);
//     };

//     const [unit, setUnit] = useState();

//     const wilayah = Object.values(
//         branch.reduce((acc, obj) => {
//             const wilayah = obj.wilayah;
//             acc[wilayah] = {
//                 id: wilayah,
//                 value: wilayah,
//                 display: `wilayah ${wilayah}`,
//             };
//             return acc;
//         }, {})
//     );

//     const titles = title.map((ttls) => ({
//         id: ttls.id,
//         value: ttls.title,
//         display: ttls.title,
//     }));

//     const onWilayahChange = (e) => {
//         const { value } = e.target;
//         const filteredObjects = branch
//             .filter((obj) => obj.wilayah == value)
//             .map(({ id, unit }) => ({ id: id, display: unit, value: id }));
//         setUnit(filteredObjects);
//     };

//     const onJabatanChangeHandler = (e) => {
//         const { value, name } = e.target;
//         setData(name, value);
//     };

//     const onInputChange = (e) => {
//         const { value, name } = e.target;
//         setData(name, value);
//     };

//     const onSubmitForm = (e) => {
//         e.preventDefault();
//         put(route("aset.mutating", aset.id));
//     };

//     return (
//         <form onSubmit={onSubmitForm}>
//             <div className="mb-1 font-semibold text-gray-500">
//                 Migrasi / Perpindahan Tangan
//             </div>
//             <div className="mb-3">
//                 <InputLabel value={"Pilih Status"} />
//                 <SelectList
//                     nullValue={true}
//                     name="keterangan_keluar"
//                     className="w-full lg:w-3/4"
//                     onChange={onHandleTypeChange}
//                     required
//                     value={data.keterangan_keluar}
//                     options={[
//                         {
//                             id: 1,
//                             value: "mutasi",
//                             display: "Mutasi / Pindah Barang",
//                         },
//                         {
//                             id: 2,
//                             value: "jual",
//                             display: "Jual",
//                         },
//                         {
//                             id: 3,
//                             value: "hilang",
//                             display: "Hilang",
//                         },
//                         {
//                             id: 4,
//                             value: "rusak",
//                             display: "Rusak",
//                         },
//                     ]}
//                 />
//             </div>
//             <div className="mb-3">
//                 <InputLabel value={"Tanggal Keluar Aset"} />
//                 <TextInput
//                     name="tanggal_keluar"
//                     required
//                     type="date"
//                     onChange={onHandleTypeChange}
//                     value={data.tanggal_keluar}
//                     className="w-full lg:w-3/4"
//                 />
//             </div>
//             {data.keterangan_keluar == "mutasi" && (
//                 <div className="col-span-1 w-full">
//                     <div className="mb-2">
//                         <InputLabel
//                             value={"Wilayah Penempatan Aset"}
//                             className="mb-1"
//                         />
//                         <SelectList
//                             onChange={onWilayahChange}
//                             options={wilayah}
//                             required
//                             nullValue={true}
//                             className="block w-full lg:w-3/4"
//                         />
//                     </div>
//                     {unit && (
//                         <>
//                             <div className="mb-2">
//                                 <InputLabel
//                                     value={"Unit Penempatan Aset"}
//                                     className="mb-1"
//                                 />
//                                 <SelectList
//                                     onChange={onInputChange}
//                                     nullValue={true}
//                                     required
//                                     options={unit}
//                                     name={"branch_id"}
//                                     value={data.branch_id}
//                                     className="block w-full lg:w-3/4"
//                                 />
//                             </div>

//                             <div className="mb-2">
//                                 <InputLabel
//                                     value={"Jabatan"}
//                                     className="mb-1"
//                                 />
//                                 <div className="flex gap-2 w-full lg:w-3/4">
//                                     <SelectList
//                                         required
//                                         onChange={onJabatanChangeHandler}
//                                         nullValue={true}
//                                         options={titles}
//                                         className={`flex-[2]`}
//                                         name={`jabatan`}
//                                         id={`jabatan`}
//                                     />
//                                     {data.jabatan === "mantri" && (
//                                         <TextInput
//                                             onChange={onInputChange}
//                                             className={`flex-1`}
//                                             type={"number"}
//                                             required
//                                             name={`area`}
//                                             id={`area`}
//                                         />
//                                     )}
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                 </div>
//             )}
//             <div className="mb-2 flex items-end justify-end">
//                 <PrimaryButton type="submit" title={"Submit"} />
//             </div>
//         </form>
//     );
// };

// export default PindahUnit;
