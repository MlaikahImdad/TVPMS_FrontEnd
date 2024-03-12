import DatePicker from "react-datepicker";

const DateRange = ({ rangeDate, setRangeDate }) => {
  const onRangeChange = (dates) => {
      if (Array.isArray(dates)){
        const [start, end] = dates;
        setRangeDate({ start: start, end: end });
    }
  };

  const onRangeChangeRaw = (e) => {
    let ele = e.target;
    if (ele.tagName === "INPUT") {
      let val = ele.value;
      let regex = /^\d{2}\/\d{2}\/\d{4}\s?-\s?\d{2}\/\d{2}\/\d{4}$/;

      let clean_val = val.replace(/[^0-9/ -]/g, "");

      if (val !== clean_val) {
        ele.value = clean_val;
      }

      if (regex.test(val)) {
        let dates = val.split("-")
        let start_date = new Date(dates[0])
        let end_date = new Date(dates[1])

        setRangeDate({start: start_date, end: end_date})
      }

    }
  };

  return (
    <DatePicker
      selected={rangeDate.start}
      startDate={rangeDate.start}
      onChange={onRangeChange}
      onChangeRaw={onRangeChangeRaw}
      endDate={rangeDate.end}
      selectsRange
      className="form-control date-picker"
      placeholderText="MM/DD/YYYY - MM/DD/YYYY"
    />
  );
};

export default DateRange;
