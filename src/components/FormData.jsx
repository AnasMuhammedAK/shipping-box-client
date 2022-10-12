import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import DropDown from "./DropDown";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createOrderAction } from "../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";


//Schema
const nameRegex = /^[a-zA-Z ]*$/
const formSchema = Yup.object({
    fullName: Yup.string()
        .matches(nameRegex, 'Only alphabetic characters are allowed')
        .max(30, 'Must be 30 characters or less')
        .required('Full Name is required'),
    weight: Yup.number()
        .positive("Must be more than 0")
        .integer("Integer allowed only")
        .required('weight is required'),
    country: Yup.object().required('country is required'),
    colour: Yup.string().required('colour is required'),
});

function FormData() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => { });
    const formik = useFormik({
        initialValues: {
            fullName: "",
            weight: "",
            country: "",
            colour: ""
        },
        onSubmit: values => {
            //dispath the action
            const data = {
                fullName: values?.fullName,
                weight: values?.weight,
                country: values?.country?.label,
                cost: values?.country?.value,
                colour: values?.colour
            }
            console.log(data)
            dispatch(createOrderAction(data))
            navigate('/table')

        },
        validationSchema: formSchema,
    });

    return (
        <>
            <div className="lg:px-36 px-6 py-12 ">
                <div className="flex flex-no-wrap items-start ">
                    <div className="w-full  ">
                        <div className="py-4 px-2  ">
                            <form action="" onSubmit={formik.handleSubmit}>
                                <div className="bg-white rounded shadow-lg mt-7 py-7 border">

                                    <div className="mt-10 px-7">
                                        <p className="text-xl font-semibold leading-tight text-gray-800">
                                            Fill the details
                                        </p>
                                        <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 ">
                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Name of client
                                                </p>
                                                <input
                                                    value={formik?.values?.fullName}
                                                    onChange={formik?.handleChange("fullName")}
                                                    onBlur={formik?.handleBlur("fullName")}
                                                    className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                                                {/* Err msg */}
                                                <div className="text-red-500">
                                                    {formik.touched.fullName && formik.errors.fullName}
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Box weight in KG
                                                </p>
                                                <input
                                                    value={formik?.values?.weight}
                                                    onChange={formik?.handleChange("weight")}
                                                    onBlur={formik?.handleBlur("weight")}
                                                    type="number" className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                                                {/* Err msg */}
                                                <div className="text-red-500">
                                                    {formik.touched.weight && formik.errors.weight}
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Box Color
                                                </p>
                                                <input
                                                    value={formik?.values?.colour}
                                                    onChange={formik?.handleChange("colour")}
                                                    onBlur={formik?.handleBlur("colour")}
                                                    placeholder="Chose a colour" type="color" className="w-full h-10   pl-60 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                                                <div className="text-red-500">
                                                    {formik.touched.colour && formik.errors.colour}
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-base font-medium leading-none text-gray-800">
                                                    Default Layout
                                                </p>
                                                <div className="relative top-1">
                                                    <div className="relative w-full mt-2 border border-gray-300 rounded outline-none dropdown-one">

                                                        <DropDown
                                                            value={formik.values.country?.label}
                                                            onChange={formik.setFieldValue}
                                                            onBlur={formik.setFieldTouched}
                                                            error={formik.errors.country}
                                                            touched={formik.touched.country}
                                                        />

                                                    </div>
                                                    {/* Err msg */}
                                                    <div className="text-red-500">
                                                        {formik.touched.country && formik.errors.country}
                                                    </div>
                                                </div>
                                                {/* end */}

                                            </div>

                                        </div>
                                    </div>


                                    <hr className="h-[1px] bg-gray-100 my-14" />
                                    <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                                      
                                        <button type="submit" className="bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white lg:max-w-[144px] w-full ">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default FormData;
