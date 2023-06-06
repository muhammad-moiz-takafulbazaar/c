// JSON data containing events and images
const eventData = {
  "2023-06-01": [
    {
      "image": "https://cdn.pixabay.com/photo/2014/03/25/15/19/cross-296507_960_720.png"
    }
  ],
  "2023-06-10": [
    {
      "image": "https://cdn.pixabay.com/photo/2014/03/25/15/19/cross-296507_960_720.png"
    }
  ]
  // Add more data as needed...
};


// Function to handle date click event
function handleDateClick(date) {
  const month = date.getMonth() + 1;
  const monthDate = date.getDate();
  const dateKey = `${date.getFullYear()}-${month > 9 ? month : `0${month}`}-${monthDate > 9 ? monthDate : `0${monthDate}`}`;
  console.log(dateKey);
  if(eventData.hasOwnProperty(dateKey)) {
    delete eventData[dateKey]
  } else {
    eventData[dateKey] = [
      {
        "image": "https://cdn.pixabay.com/photo/2014/03/25/15/19/cross-296507_960_720.png"
      }
    ]
  }
  generateCalendar()
  console.log(Object.keys(eventData).length, 'eventData.length')
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

// Function to generate the calendar
function generateCalendar() {

  var calendarDiv = document.querySelector(".calendar");
  removeAllChildNodes(calendarDiv);
  // Get the current date
  var currentDate = new Date();

  // Get the current month and year
  var currentMonth = currentDate.getMonth();
  var currentYear = currentDate.getFullYear();

  // Array of month names
  var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Create the header
  var monthHeader = document.createElement("div");
  monthHeader.className = "month";
  monthHeader.textContent = monthNames[currentMonth] + " " + currentYear;
  calendarDiv.appendChild(monthHeader);

  // Create the weekdays header
  var weekdaysHeader = document.createElement("div");
  weekdaysHeader.className = "weekdays";
  calendarDiv.appendChild(weekdaysHeader);

  // Create the weekdays labels (Sun, Mon, Tue, etc.)
  var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (var i = 0; i < weekdays.length; i++) {
    var weekday = document.createElement("div");
    weekday.textContent = weekdays[i];
    weekdaysHeader.appendChild(weekday);
  }

  // Create the days
  var daysDiv = document.createElement("div");
  daysDiv.className = "days";
  calendarDiv.appendChild(daysDiv);

  // Get the first day of the month
  var firstDay = new Date(currentYear, currentMonth, 1);
  var startingDay = firstDay.getDay();

  // Get the number of days in the month
  var monthLength = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Add empty days for previous month
  for (var i = 0; i < startingDay; i++) {
    var dayDiv = document.createElement("div");
    daysDiv.appendChild(dayDiv);
  }

  // Add days with events and images
  for (var i = 1; i <= monthLength; i++) {
    var dayDiv = document.createElement("div");
    dayDiv.textContent = i;

    // Get the date for the clicked day
    // var date = new Date(currentYear, currentMonth, i);

    // Attach click event listener
    dayDiv.addEventListener("click", function (event) {
      var clickedDate = new Date(currentYear, currentMonth, parseInt(event.target.textContent));
      handleDateClick(clickedDate);
    });

    daysDiv.appendChild(dayDiv);

    // Check if there are events for the current day
    var dateKey = currentYear + "-" + (currentMonth + 1).toString().padStart(2, '0') + "-" + i.toString().padStart(2, '0');
    if (eventData[dateKey]) {
      // Create event elements
      var eventContainer = document.createElement("div");
      eventContainer.className = "event";
      eventData[dateKey].forEach(function (event) {
        // Create event image
        var eventImage = document.createElement("img");
        eventImage.src = event.image;
        eventImage.className = "image";
        eventContainer.appendChild(eventImage);
      });

      dayDiv.appendChild(eventContainer);
    }

    daysDiv.appendChild(dayDiv);
  }
}

// Call the function to generate the calendar
generateCalendar();