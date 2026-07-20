"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HomeButton from "@/components/layout/HomeButton";

export default function ScanPage() {
  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  const [fileName, setFileName] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const [hasPrediction, setHasPrediction] =
    useState(false);


  const [prediction, setPrediction] = useState<{
    fishId: string;
    confidence: number;
  } | null>(null);



  function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      event.target.files?.[0];


    if (!file) {
      return;
    }


    const previewUrl =
      URL.createObjectURL(file);


    setImagePreview(previewUrl);
    setFileName(file.name);

    setHasPrediction(false);
    setPrediction(null);
  }




  async function handleIdentifyFish() {

    const input =
      document.querySelector(
        "input[type=file]"
      ) as HTMLInputElement;


    const file =
      input.files?.[0];


    if (!file) {
      return;
    }



    setIsLoading(true);
    setHasPrediction(false);



    const formData =
      new FormData();


    formData.append(
      "file",
      file
    );



    try {

      const response =
        await fetch(
          "http://localhost:8080/api/ai/predict",
          {
            method: "POST",
            body: formData,
          }
        );


      if (!response.ok) {
        throw new Error(
          "Prediction failed"
        );
      }



      const data =
        await response.json();



      console.log(
        "AI Result:",
        data
      );



      setPrediction({
        fishId: data.fishId,
        confidence: data.confidence,
      });



      setHasPrediction(true);



    } catch(error) {

      console.error(
        error
      );

      alert(
        "AI prediction failed"
      );


    } finally {

      setIsLoading(false);

    }

  }




  return (
    <main className="min-h-screen bg-[#f5f7f2] px-8 py-10 text-gray-950">

      <HomeButton />


      <section className="mx-auto mt-8 max-w-5xl">


        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
          AI Recognition
        </p>


        <h1 className="mb-4 text-5xl font-bold">
          Scan Fish
        </h1>


        <p className="mb-10 max-w-2xl text-gray-600">
          Upload a fish photo and FishDex AI
          will identify the species.
        </p>




        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">


          {/* Upload */}
          <div className="rounded-3xl bg-white p-6 shadow-sm">


            <label
              className="
              flex h-96 cursor-pointer
              flex-col items-center
              justify-center rounded-3xl
              border-2 border-dashed
              border-gray-300
              bg-gray-50
              p-6 text-center
              transition hover:border-gray-900
              "
            >

              {
                imagePreview ? (

                  <Image
                    src={imagePreview}
                    alt="Uploaded fish"
                    width={800}
                    height={500}
                    className="
                    max-h-full
                    w-auto
                    object-contain
                    "
                  />


                ) : (

                  <div>

                    <p className="text-lg font-semibold">
                      Upload Fish Photo
                    </p>


                    <p className="mt-2 text-sm text-gray-500">
                      Click here to choose image
                    </p>

                  </div>

                )
              }



              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />


            </label>



            <p className="mt-4 text-center text-sm text-gray-500">

              {
                fileName
                  ? fileName
                  : "No image selected"
              }

            </p>




            <button

              onClick={
                handleIdentifyFish
              }

              disabled={
                !imagePreview ||
                isLoading
              }


              className="
              mt-6 w-full rounded-full
              bg-gray-950 px-6 py-4
              text-sm font-semibold
              text-white transition
              hover:bg-gray-800
              disabled:cursor-not-allowed
              disabled:opacity-40
              "

            >

              {
                isLoading
                  ? "Identifying..."
                  : "Identify Fish"
              }


            </button>


          </div>





          {/* Result */}
          <div className="rounded-3xl bg-white p-6 shadow-sm">


            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-green-600">
              Prediction
            </p>




            {
              isLoading ? (

                <div className="
                flex h-72 items-center
                justify-center rounded-3xl
                bg-gray-50
                ">

                  <div className="text-center">

                    <p className="text-xl font-semibold">
                      AI analyzing...
                    </p>


                    <p className="mt-2 text-gray-500">
                      ResNet18 is predicting
                    </p>

                  </div>


                </div>


              ) : !hasPrediction ? (

                <div className="
                flex h-72 items-center
                justify-center rounded-3xl
                bg-gray-50 text-center
                text-gray-500
                ">

                  Upload an image
                  and click Identify Fish.


                </div>


              ) : (

                <div>


                  <h2 className="text-3xl font-bold">

                    {prediction?.fishId}

                  </h2>



                  <div className="
                  mt-6 rounded-2xl
                  bg-gray-50 p-5
                  ">

                    <p className="text-sm text-gray-500">
                      Confidence
                    </p>


                    <p className="mt-1 text-4xl font-bold">

                      {
                        Math.round(
                          (prediction?.confidence ?? 0)
                          * 100
                        )
                      }%

                    </p>


                  </div>




                  <Link

                    href={
                      `/fishdex/${prediction?.fishId}`
                    }

                    className="
                    mt-6 inline-flex
                    w-full justify-center
                    rounded-full
                    border border-gray-300
                    px-6 py-4
                    text-sm font-semibold
                    transition
                    hover:border-gray-950
                    "

                  >

                    View in FishDex


                  </Link>


                </div>

              )

            }



          </div>


        </div>


      </section>


    </main>
  );
}