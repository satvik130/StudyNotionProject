import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import { getAIRecommendations } from "../../../services/operations/aiRecommendationAPI"

export default function EnrolledCourses() {

  const { token } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  const [recommendations, setRecommendations] = useState("")

  const [recommendationLoading, setRecommendationLoading] = useState(false)

  const getEnrolledCourses = async () => {
    try {

      const res = await getUserEnrolledCourses(token)

      setEnrolledCourses(res)

    } catch (error) {

      console.log("Could not fetch enrolled courses.")
    }
  }

  const handleGetRecommendations = async () => {

    setRecommendationLoading(true)

    const response = await getAIRecommendations(token)

    if (response?.success) {

      setRecommendations(response.recommendations)

    } else {

      setRecommendations("Failed to generate recommendations.")
    }

    setRecommendationLoading(false)
  }

  useEffect(() => {
    getEnrolledCourses()
  }, [])

  return (
    <>

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="text-3xl text-richblack-50">
          Enrolled Courses
        </div>

        <button
          onClick={handleGetRecommendations}
          className="bg-yellow-400 hover:bg-yellow-300
          text-black font-semibold px-5 py-3
          rounded-xl transition-all duration-300
          shadow-[0_0_20px_rgba(255,204,0,0.3)]"
        >
          AI Recommendations ✨
        </button>

      </div>

      {/* Recommendation Loading */}

      {
        recommendationLoading && (
          <div className="mt-8 flex items-center gap-3 text-yellow-50">

            <div
              className="w-6 h-6 border-2 border-yellow-400
              border-t-transparent rounded-full animate-spin"
            ></div>

            <p>Generating AI recommendations...</p>

          </div>
        )
      }

      {/* Recommendations Output */}

      {
        recommendations && !recommendationLoading && (
          <div
            className="mt-8 mb-8 bg-richblack-800
            border border-richblack-700 rounded-2xl p-6
            shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          >

            <h2 className="text-2xl font-bold text-yellow-50 mb-4">
              Personalized AI Recommendations 🚀
            </h2>

            <div className="whitespace-pre-wrap leading-8 text-richblack-50">
              {recommendations}
            </div>

          </div>
        )
      }

      {/* Existing Course Section */}

      {!enrolledCourses ? (

        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>

      ) : !enrolledCourses.length ? (

        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
        </p>

      ) : (

        <div className="my-8 text-richblack-5">

          {/* Headings */}

          <div className="flex rounded-t-lg bg-richblack-500 ">

            <p className="w-[45%] px-5 py-3">
              Course Name
            </p>

            <p className="w-1/4 px-2 py-3">
              Duration
            </p>

            <p className="flex-1 px-2 py-3">
              Progress
            </p>

          </div>

          {/* Course List */}

          {enrolledCourses.map((course, i, arr) => (

            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1
                  ? "rounded-b-lg"
                  : "rounded-none"
              }`}
              key={i}
            >

              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {

                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >

                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />

                <div className="flex max-w-xs flex-col gap-2">

                  <p className="font-semibold">
                    {course.courseName}
                  </p>

                  <p className="text-xs text-richblack-300">

                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}

                  </p>

                </div>

              </div>

              <div className="w-1/4 px-2 py-3">
                {course?.totalDuration}
              </div>

              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">

                <p>
                  Progress: {course.progressPercentage || 0}%
                </p>

                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />

              </div>

            </div>

          ))}

        </div>

      )}

    </>
  )
}