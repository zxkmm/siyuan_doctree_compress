export async function appendCurrentDeviceIntoList(settingUtils) {
  try {
    // await!!!!!
    var current_device_info = await fetchCurrentDeviceInfo();

    var enableDeviceList = settingUtils.get("enableDeviceList");
    var enableDeviceListArray = enableDeviceList.split("\n");
    var enableDeviceListArrayLength = enableDeviceListArray.length;
    var enableDeviceListArrayLast =
      enableDeviceListArray[enableDeviceListArrayLength - 1];

    // remove empty line
    if (enableDeviceListArrayLast === "") {
      enableDeviceListArray.pop();
    }

    enableDeviceListArray.push(current_device_info);

    var enableDeviceListArrayString = enableDeviceListArray.join("\n");

    settingUtils.assignValue("enableDeviceList", enableDeviceListArrayString);
    settingUtils.save();
  } catch (error) {
    console.error("Error appending current device into list:", error);
  }
}

export async function removeCurrentDeviceFromList(settingUtils) {
  try {
    var current_device_info = await fetchCurrentDeviceInfo();

    var enableDeviceList = settingUtils.get("enableDeviceList");
    var enableDeviceListArray = enableDeviceList.split("\n");

    // make sure visited the entire list
    for (var i = enableDeviceListArray.length - 1; i >= 0; i--) {
      var deviceInfo = enableDeviceListArray[i];

      if (deviceInfo === current_device_info) {
        enableDeviceListArray.splice(i, 1);
      }
    }

    // reassemble list
    var enableDeviceListArrayString = enableDeviceListArray.join("\n");

    settingUtils.assignValue("enableDeviceList", enableDeviceListArrayString);
    settingUtils.save();
  } catch (error) {
    console.error("Error removing current device from list:", error);
  }
}

export async function fetchCurrentDeviceInfo(): Promise<string> {
  var current_device_uuid = window.siyuan.config.system.id;
  var current_device_name = window.siyuan.config.system.name;
  var current_device_info = current_device_uuid + " " + current_device_name;

  return Promise.resolve(current_device_info.toString());
}

export async function currentDeviceInList(settingUtils) {
  try {
    var current_device_info = await fetchCurrentDeviceInfo();

    var enableDeviceList = await settingUtils.get("enableDeviceList");
    var enableDeviceListArray = enableDeviceList.split("\n");

    return enableDeviceListArray.includes(current_device_info);
  } catch (error) {
    console.error("Error checking if current device is enabled:", error);
  }
}
