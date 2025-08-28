"use client"

import { motion } from "framer-motion"
import { Star, Award, Video } from "lucide-react"
import Image from "next/image"

export default function InstructorTab({ courseData }) {
    const tabVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    // Helper function to validate image URL
    const isValidImageUrl = (url) => {
        if (!url) return false
        try {
            new URL(url)
            return true
        } catch {
            return false
        }
    }

    if (!courseData.instructor) {
        return (
            <motion.div
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3 }}
                className="text-center text-gray-300 py-8"
            >
                <p>Instructor information not available</p>
            </motion.div>
        )
    }

    return (
        <motion.div
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="space-y-4 sm:space-y-6"
        >
            <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 mx-auto sm:mx-0">
                    {courseData.instructor.photoUrl && isValidImageUrl(courseData.instructor.photoUrl) ? (
                        <Image
                            src={courseData.instructor.photoUrl}
                            alt={courseData.instructor.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'flex'
                            }}
                        />
                    ) : null}
                    <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold" style={{ display: courseData.instructor.photoUrl && isValidImageUrl(courseData.instructor.photoUrl) ? 'none' : 'flex' }}>
                        {courseData.instructor.name.charAt(0)}
                    </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">
                        {courseData.instructor.name}
                    </h3>
                    <p className="text-purple-400 mb-2 sm:mb-3 text-xs sm:text-sm lg:text-base">
                        {courseData.instructor.designation}
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 lg:gap-6 text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-400 fill-current" />
                            <span>4.9 Instructor Rating</span>
                        </div>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <Award className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-purple-400" />
                            <span>{courseData.totalJoin || 0} Students</span>
                        </div>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <Video className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-400" />
                            <span>{courseData.instructor.experience} Years Experience</span>
                        </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-xs sm:text-sm lg:text-base">
                        {courseData.instructor.bio}
                    </p>
                </div>
            </div>

            {/* Instructor Expertise */}
            {courseData.instructor.expertise && courseData.instructor.expertise.length > 0 && (
                <div>
                    <h4 className="text-lg font-bold text-white mb-3">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                        {courseData.instructor.expertise.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Instructor Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-4 text-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                        {courseData.totalJoin || 0}+
                    </div>
                    <div className="text-gray-300 text-xs sm:text-sm lg:text-base">Students</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-4 text-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                        {courseData.instructor.experience}
                    </div>
                    <div className="text-gray-300 text-xs sm:text-sm lg:text-base">Years Experience</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-4 text-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">4.9</div>
                    <div className="text-gray-300 text-xs sm:text-sm lg:text-base">Rating</div>
                </div>
            </div>
        </motion.div>
    )
}
