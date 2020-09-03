// function convertTimestamptoTime(timestamp) {
//   var d = new Date(timestamp), // Convert the passed timestamp to milliseconds
//     yyyy = d.getFullYear(),
//     mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
//     dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
//     hh = d.getHours(),
//     h = hh,
//     min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
//     ampm = 'AM',
//     day = d.getDay(),
//     time;
//   let date;

//   if (mm == '01') {
//     mm = 'Januari';
//   }
//   if (mm == '02') {
//     mm = 'Februari';
//   }
//   if (mm == '03') {
//     mm = 'Maret';
//   }
//   if (mm == '04') {
//     mm = 'April';
//   }
//   if (mm == '05') {
//     mm = 'Mei';
//   }
//   if (mm == '06') {
//     mm = 'Juni';
//   }
//   if (mm == '07') {
//     mm = 'Juli';
//   }
//   if (mm == '08') {
//     mm = 'Agustus';
//   }
//   if (mm == '09') {
//     mm = 'September';
//   }
//   if (mm == '10') {
//     mm = 'Oktober';
//   }
//   if (mm == '11') {
//     mm = 'November';
//   }
//   if (mm == '12') {
//     mm = 'Desember';
//   }

//   // ie: 2013-02-18, 8:35 AM
//   date = dd + '-' + mm + '-' + yyyy;
//   time = h + ':' + min + ' ' + ampm;

//   setNowDate(`${dd} ${mm} ${yyyy}`);

//   return {day, date, time};
// }
