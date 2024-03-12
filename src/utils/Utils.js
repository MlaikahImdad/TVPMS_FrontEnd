import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import no_image from "src/images/no_image.webp";
import { toast } from "react-toastify";
import { Icon } from "src/components/Component";

//url for production
export var url = "";
if (process.env.NODE_ENV === "development") {
  url = "";
} else {
  url = window.location.host.split("/")[1];
  if (url) {
    url = `/${window.location.host.split("/")[1]}`;
  } else url = process.env.PUBLIC_URL; /// ADD YOUR CPANEL SUB-URL
}

export const NoImage = no_image;

export const readImg = (name) => {
  return process.env.REACT_APP_SERVER_URL + name;
};

//Function to validate and return errors for a form
export const checkForm = (formData) => {
  let errorState = {};
  Object.keys(formData).forEach((item) => {
    if (formData[item] === null || formData[item] === "") {
      errorState[item] = "This field is required";
    }
  });
  return errorState;
};

//Function that returns the first or first two letters from a name
export const findUpper = (string) => {
  let extractedString = [];

  for (var i = 0; i < string.length; i++) {
    if (string.charAt(i) === string.charAt(i).toUpperCase() && string.charAt(i) !== " ") {
      extractedString.push(string.charAt(i));
    }
  }
  if (extractedString.length > 1) {
    return extractedString[0] + extractedString[1];
  } else {
    return extractedString[0];
  }
};

//Function that calculates the from current date
export const setDeadline = (days) => {
  let todayDate = new Date();
  var newDate = new Date(todayDate);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

// Function to set deadline for projects
export const setDeadlineDays = (deadline) => {
  var currentDate = new Date();
  var difference = deadline.getTime() - currentDate.getTime();
  var days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
};

//Date formatter function
export const dateFormatterAlt = (date, reverse) => {
  let d = date.getDate();
  let m = date.getMonth();
  let y = date.getFullYear();
  reverse ? (date = m + "-" + d + "-" + y) : (date = y + "-" + d + "-" + m);
  return date;
};

//Date formatter function
export const dateFormatter = (date, reverse) => {
  var dateformat = date.split("-");
  //var date = dateformat[1]+"-"+dateformat[2]+"-"+dateformat[0];
  reverse
    ? (date = dateformat[2] + "-" + dateformat[0] + "-" + dateformat[1])
    : (date = dateformat[1] + "-" + dateformat[2] + "-" + dateformat[0]);
  return date;
};

//Month Names
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//todays Date
export const todaysDate = new Date();

// Function to structure date ex : Jun 4, 2011;
export const getDateStructured = (date) => {
  let d = date.getDate();
  let m = date.getMonth();
  let y = date.getFullYear();
  let final = monthNames[m] + " " + d + ", " + y;
  return final;
};

// Function to structure date ex: YYYY-MM-DD
export const setDateForPicker = (rdate) => {
  let d = rdate.getDate();
  d < 10 && (d = "0" + d);
  let m = rdate.getMonth() + 1;
  m < 10 && (m = "0" + m);
  let y = rdate.getFullYear();
  rdate = y + "-" + m + "-" + d;

  return rdate;
};

//current Time
export const currentTime = () => {
  var hours = todaysDate.getHours();
  var minutes = todaysDate.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

//Percentage calculation
export const calcPercentage = (str1, str2) => {
  let result = Number(str2) / Number(str1);
  result = result * 100;
  return Math.floor(result);
};

//shortens a long string
export const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + " " + truncate(str.substr(n - 1, str.length), n) : str;
};

export const RedirectAs404 = ({ location }) => (
  <Redirect to={Object.assign({}, location, { state: { is404: true } })} />
);

// returns upload url
export const getUploadParams = () => {
  return { url: "https://httpbin.org/post" };
};

// Converts KB to MB
export const bytesToMegaBytes = (bytes) => {
  let result = bytes / (1024 * 1024);
  return result.toFixed(2);
};

export const bulkActionOptions = [
  { value: "suspend", label: "Suspend User" },
  { value: "delete", label: "Delete User" },
];

export const showAlert = (type, message, position = "bottom-right") => {
  let options = {
    position: position,
    autoClose: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: false,
    closeButton: () => {
      return (
        <span className="btn-trigger toast-close-button" role="button">
          <Icon name="cross"></Icon>
        </span>
      );
    },
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    default:
      toast.info(message, options);
  }
};

export const deleteConfirmation = () => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      // return result.isConfirmed;
      if (result.isConfirmed) {
        resolve();
      }
    });
  });
};

export const getPlural = (word) => {
  // Define some irregular plural forms
  const irregularPlurals = {
    man: "men",
    woman: "women",
    child: "children",
    tooth: "teeth",
    foot: "feet",
    person: "people",
    goose: "geese",
    mouse: "mice",
  };

  // Check if the word is an irregular plural
  if (irregularPlurals.hasOwnProperty(word)) {
    return irregularPlurals[word];
  }

  // If not, check if it ends in "s", "x", "z", "ch", or "sh"
  if (word.endsWith("s") || word.endsWith("x") || word.endsWith("z") || word.endsWith("ch") || word.endsWith("sh")) {
    return word + "es";
  }

  // If not, check if it ends in "y" and the letter before "y" is a consonant
  if (word.endsWith("y") && !/[aeiouy]/.test(word.charAt(word.length - 2))) {
    return word.slice(0, -1) + "ies";
  }

  // If not, just add "s"
  return word + "s";
};

export const getUser = () => {
  let user = JSON.parse(sessionStorage.getItem("user"));
  return user;
};

export const getUserCompanyId = () => {
  let user = getUser();
  return user.companyId;
};

export const beautifyDate = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    // timeZoneName: "short",
  };
  return dateTime.toLocaleString("en-US", options);
};

export const mergeObjects = (obj1, obj2) => {
  const mergedObj = { ...obj1 };

  for (let key in obj2) {
    if (!mergedObj.hasOwnProperty(key)) {
      mergedObj[key] = obj2[key];
    } else if (
      typeof obj2[key] === "object" &&
      typeof mergedObj[key] === "object" &&
      !Array.isArray(obj2[key]) &&
      !Array.isArray(mergedObj[key])
    ) {
      mergedObj[key] = mergeObjects(mergedObj[key], obj2[key]);
    }
  }

  return mergedObj;
};
