import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import Image from "next/image";

import { default as ClockIcon } from "../../assets/clock.svg";
import { default as CalendarIcon } from "../../assets/calendar.svg";
import { default as LocationIcon } from "../../assets/location.svg";
import { default as WingIcon } from "../../assets/wing.svg";

const ReviewItem = (props: any) => {
  const { task } = props;
  let status;
  switch (task?.task_going_status) {
    case "0":
      status = "Open";
      break;
    case "1":
      status = "Draft";
      break;
    case "2":
      status = "Assigned";
      break;
    case "3":
      status = "Completed";
      break;
    case "4":
      status = "Expired";
      break;
    case "5":
      status = "Waiting for Offers";
      break;
    case "6":
      status = "Cancelled By Tasker";
      break;
    case "7":
      status = "Cancelled by Poster";
      break;
    default:
      console.log(`Sorry, we are out of ${status}.`);
  }

  return (
    <div className="border-1 mx-2 flex w-[390px] flex-col gap-y-[10px] rounded border border-slate-300 p-5">
      <div className="flex w-full place-content-between">
        <span className="text-[17px] font-medium leading-[25.5px]">
          {task?.task_title}
        </span>
        <span className="text-[17px] font-bold leading-[25.5px]">
          SR {task?.task_total_budget || 0}
        </span>
      </div>
      <div className="flex items-center gap-[5px]">
        <Image src={LocationIcon} className="h-4 w-4" alt="location" />
        <span className="text-[13px]">
          {task?.is_task_remotely === 1 ? "Remote" : "In person"}
        </span>
      </div>
      <div className="flex items-center gap-[5px]">
        <Image src={CalendarIcon} alt="calendar" className="h-4 w-4" />
        <span className="text-[13px]">{task?.task_complete_date}</span>
      </div>
      <div className="flex items-center gap-[5px]">
        <Image src={ClockIcon} alt="clock" className="h-4 w-4" />
        <span className="text-[13px]">{task?.created_at}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="rounded-3xl bg-[#F5F7FA] px-5 py-2 text-[13px] font-bold text-[#7db343]">
          {status}
        </span>
        <Image src={WingIcon} alt="wing" className="h-10 w-10" />
      </div>
    </div>
  );
};

const Reviews = (props: any) => {
  const { tasks } = props;

  const { t } = useTranslation();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    centerMode: true,
    variableWidth: true,
    cssEase: "linear",
  };

  return (
    <section>
      <div className="container mx-auto mb-12 mt-[85px] text-center">
        <h2 className="mb-3 font-sfpro text-xl font-bold leading-6 text-general-default">
          {t("labour_exchange")}
        </h2>
        <p className="mx-auto max-w-[1258px] font-sfpro text-[17px] font-normal leading-[25.5px] text-general-default">
          {t("about_taklief")}
        </p>
      </div>
      <div className="mb-[76px] w-full overflow-hidden">
        <Slider {...settings}>
          {tasks?.map((val: Object, index: Number) => (
            <ReviewItem task={val} key={index} />
          ))}
        </Slider>
        <div className="mt-3" />
        <Slider {...settings} rtl>
          {tasks?.map((val: Object, index: Number) => (
            <ReviewItem task={val} key={index} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Reviews;
