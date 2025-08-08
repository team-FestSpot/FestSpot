import React, { useState } from "react";
import {
  Search,
  Menu,
  User,
  Calendar,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Plus,
  Music,
  Mic2,
  Theater,
} from "lucide-react";

const PerformanceApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 공연 데이터
  const performanceData = [
    {
      id: 1,
      title: "뮤지컬 라이온킹",
      venue: "샤롯데 극장",
      time: "19:30",
      date: "12.15",
      type: "musical",
      status: "available",
    },
    {
      id: 2,
      title: "콘서트 아이유",
      venue: "올림픽 체조경기장",
      time: "20:00",
      date: "12.18",
      type: "concert",
      status: "available",
    },
    {
      id: 3,
      title: "연극 햄릿",
      venue: "대학로 소극장",
      time: "19:00",
      date: "12.20",
      type: "play",
      status: "available",
    },
    {
      id: 4,
      title: "오페라 라보엠",
      venue: "예술의전당",
      time: "19:30",
      date: "12.22",
      type: "opera",
      status: "available",
    },
    {
      id: 5,
      title: "발레 백조의 호수",
      venue: "세종문화회관",
      time: "20:00",
      date: "12.25",
      type: "ballet",
      status: "available",
    },
    {
      id: 6,
      title: "뮤지컬 위키드",
      venue: "블루스퀘어",
      time: "19:30",
      date: "12.28",
      type: "musical",
      status: "available",
    },
    {
      id: 7,
      title: "클래식 신년음악회",
      venue: "롯데콘서트홀",
      time: "19:00",
      date: "01.01",
      type: "classical",
      status: "available",
    },
    {
      id: 8,
      title: "재즈 페스티벌",
      venue: "블루노트",
      time: "21:00",
      date: "01.05",
      type: "jazz",
      status: "available",
    },
  ];

  // 일정 데이터
  const scheduleData = [
    {
      id: 1,
      title: "뮤지컬 라이온킹",
      date: "12.15",
      color: "bg-red-100 text-red-800 border-red-200",
    },
    {
      id: 2,
      title: "콘서트 아이유",
      date: "12.18",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      id: 3,
      title: "연극 햄릿",
      date: "12.20",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    {
      id: 4,
      title: "오페라 라보엠",
      date: "12.22",
      color: "bg-purple-100 text-purple-800 border-purple-200",
    },
    {
      id: 5,
      title: "발레 백조의 호수",
      date: "12.25",
      color: "bg-pink-100 text-pink-800 border-pink-200",
    },
  ];

  const boardItems = [
    "공연 후기",
    "티켓 양도",
    "공연 정보",
    "추천 공연",
    "관람 모임",
    "공연장 정보",
  ];

  const recentItems = [
    "최신 공연1",
    "최신 공연2",
    "최신 공연3",
    "최신 공연4",
    "performance_id_73440398b0178e76832...",
  ];

  // 공연 타입별 아이콘
  const getPerformanceIcon = (type) => {
    switch (type) {
      case "musical":
        return <Music className="h-6 w-6 text-[#EF5A39]" />;
      case "concert":
        return <Mic2 className="h-6 w-6 text-[#EF5A39]" />;
      case "play":
        return <Theater className="h-6 w-6 text-[#EF5A39]" />;
      case "opera":
        return <Music className="h-6 w-6 text-[#EF5A39]" />;
      case "ballet":
        return <Theater className="h-6 w-6 text-[#EF5A39]" />;
      case "classical":
        return <Music className="h-6 w-6 text-[#EF5A39]" />;
      case "jazz":
        return <Mic2 className="h-6 w-6 text-[#EF5A39]" />;
      default:
        return <Music className="h-6 w-6 text-[#EF5A39]" />;
    }
  };

  // 캘린더 관련 함수들
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // 빈 칸 추가
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    // 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === new Date().getDate() &&
        currentMonth.getMonth() === new Date().getMonth() &&
        currentMonth.getFullYear() === new Date().getFullYear();

      const hasEvent = scheduleData.some(
        (event) => parseInt(event.date.split(".")[1]) === day
      );

      days.push(
        <div
          key={day}
          className={`h-8 flex items-center justify-center text-sm cursor-pointer rounded relative
            ${
              isToday
                ? "bg-[#EF5A39] text-white font-bold"
                : "hover:bg-[#EF5A39]/10"
            }
            ${
              hasEvent && !isToday
                ? "bg-[#EF5A39]/20 text-[#EF5A39] font-semibold"
                : ""
            }
          `}
          onClick={() =>
            setSelectedDate(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
            )
          }
        >
          {day}
          {hasEvent && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#EF5A39] rounded-full"></div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#EF5A39] rounded-full flex items-center justify-center">
                <Music className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FeatSpot</span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="공연명을 입력하세요"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#EF5A39] focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button className="bg-[#EF5A39] text-white px-6 py-2 rounded-lg hover:bg-[#d64a32] transition-colors font-medium">
                Login
              </button>
              <button className="p-2 text-gray-600 hover:text-[#EF5A39] transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Section - Performance Cards */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {performanceData.map((performance) => (
                <div
                  key={performance.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-[#EF5A39]/30 transition-all duration-200 cursor-pointer"
                >
                  <div className="p-5">
                    {/* Performance Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-[#EF5A39]/10 rounded-full flex items-center justify-center">
                        {getPerformanceIcon(performance.type)}
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="text-center mb-3">
                      <div className="text-lg font-bold text-[#EF5A39] mb-1">
                        {performance.date}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center justify-center">
                        <Clock className="h-4 w-4 mr-1 text-[#EF5A39]" />
                        {performance.time}
                      </div>
                    </div>

                    {/* Performance Info */}
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                        {performance.title}
                      </h3>
                      <p className="text-xs text-gray-600 flex items-center justify-center">
                        <MapPin className="h-3 w-3 mr-1 text-[#EF5A39]" />
                        {performance.venue}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-4 text-center">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-[#EF5A39]/10 text-[#EF5A39] rounded-full">
                        예매가능
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Calendar & Schedule */}
          <div className="space-y-6">
            {/* Calendar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {currentMonth.toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                  })}
                </h2>
                <div className="flex space-x-1">
                  <button
                    onClick={previousMonth}
                    className="p-2 hover:bg-[#EF5A39]/10 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4 text-[#EF5A39]" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-[#EF5A39]/10 rounded-lg transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 text-[#EF5A39]" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                  <div
                    key={day}
                    className="h-8 flex items-center justify-center text-sm font-medium text-gray-500"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

              {/* Schedule Events on Calendar */}
              <div className="mt-4 space-y-2">
                {scheduleData.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={`p-2 rounded-lg text-xs border ${event.color}`}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs opacity-75">{event.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Board Lists */}
            <div className="space-y-4">
              {/* 자유 게시판 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-[#EF5A39]">
                  자유 게시판
                </h3>
                <div className="space-y-2">
                  {boardItems.slice(0, 3).map((item, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-600 hover:text-[#EF5A39] cursor-pointer transition-colors py-1 border-b border-gray-100 last:border-b-0"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* 최신 게시판 */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-[#EF5A39]">
                  자유 게시판
                </h3>
                <div className="space-y-2">
                  {recentItems.map((item, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-600 hover:text-[#EF5A39] cursor-pointer transition-colors py-1 border-b border-gray-100 last:border-b-0"
                    >
                      {item.length > 20 ? item.substring(0, 20) + "..." : item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-[#EF5A39] text-white p-4 rounded-full shadow-lg hover:bg-[#d64a32] transition-colors z-50">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default PerformanceApp;
