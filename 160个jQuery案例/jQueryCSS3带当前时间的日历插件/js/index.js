$(document).ready(function(){
  // CALENDAR
  $('#calendar').datepicker();
  // TIME & DATE
  $.fn.Clock = function() {
    var days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    var months = ['JAN','FEB','MAR','APR','MAY','JUNE','JULY','AUG','SEP','OCT','NOV','DEC'];
    var d = new Date(); var year = d.getFullYear();
    function getTime() {
      var date = new Date(), hour = date.getHours();
      var dd = 'AM'; var h = hour;
      if ( h > 12 ) { h = hour - 12; dd = 'PM'; }
      if ( h == 0 ) { h = 12; }
      return {
        day: days[date.getDay()],
        date: date.getDate(),
        month: months[date.getMonth()],
        hour: appendZero(h),
        minute: appendZero(date.getMinutes()),
        dd: dd
      };
    }
    function appendZero(num) {
      if ( num < 10 ) { return '0' + num; }
      return num;
    }
    function refreshClock() {
      var now = getTime();
      $('#date_time').html('<div class="time">' + now.hour + ':' + now.minute + ' ' + now.dd + '</div><div class="date">' + now.day + ', ' + now.month + ' ' + now.date + ', ' + year + '</div>');
      setTimeout(function() { refreshClock(); });
    } refreshClock(); };
  $('#date_time').Clock();
});