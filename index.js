const { getLocalInfo } = require("phone-number-to-timezone");

function extractAreaCode(phone) {
  const digits = String(phone || "").replace(/\D/g, ""); //Regex to remove all non-digits.
  const usNumber =
    digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits; //Normalize digits to 10 digits.

  if (usNumber.length < 3) {
    return null;
  }

  return usNumber.slice(0, 3);
}

function getTimezoneFromPhone(phone) {
  const areaCode = extractAreaCode(phone);
  if (!areaCode) {
    return "";
  }

  const tzInfo = getLocalInfo(areaCode, { zone_display: "name" });
  return tzInfo && tzInfo.time && tzInfo.time.zone ? tzInfo.time.zone : "";
}

/*
LOCAL TEST MODE (Node):
1) Uncomment everything in this block.
2) Comment out the Zapier return block below.
*/
let testData = {
  first_name: "Jamie",
  last_name: "Dawson",
  phone: "14155551234",
  timezone: "",
};

testData.timezone = getTimezoneFromPhone(testData.phone);
console.log("Parsed contact:", testData);

/*
ZAPIER MODE:
1) Keep this block active for Code by Zapier.
2) Keep LOCAL TEST MODE block commented.
This gets the phone number from the Webhook in Zapier and then returns it for the next step.
*/
// return {
//   timezone: getTimezoneFromPhone(inputData.phone),
// };
