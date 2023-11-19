## Intro

### Foreword
Hi there! This is my first 'article' thingy I'm writing for my website. My aim is to be able to share some information I've discovered with anyone who might need it. I'm hoping you're finding this from a search or a link! If not, I hope you don't find this after you've gone through all the headache and trial and error that I have. 

### My Current Setup
When I originally set this up, it was about a year ago in 2022 when I installed TrueNAS Scale on my old tower PC after upgrading. Taking a look through the apps in there, I saw the Home Assistant app, and the rest is history. I've probably spent 100+ hours on HA, and I don't plan on stopping any time soon. Since then, I switched my NAS to some pre-owned server hardware, where it lives now at my parent's house, and I have my own setup in my apartment. Now that you've heard my life story, my current setup follows:

- Mac Mini (2016-era)
	- [HA SkyConnect](https://www.seeedstudio.com/Home-Assistant-SkyConnect-p-5479.html) (Gen1?)
	- [NooElec NESDR Nano 2+](https://a.co/d/fPTZlVL)

## The Actual Guide (TM)

### 1. Install the Mosquitto Broker Addon
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118170220.png)
### 2. Install the RTL-433 Addon(s)

You can find the repository here: https://github.com/pbkhrv/rtl_433-hass-addons
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118165840.png)

Copy the repository link, then go to the add-on store in HA. Once there, open up the context menu in the top right and open the repositories dialog
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118165840.png)

Paste the link into the text field, then hit add. This should take just a second to add.
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118165934.png)

Once done successfully, you should see 'rtl_433 Home Assistant add-ons' added to the list
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118165941.png)

Reload the page, then scroll down to the bottom of the page to find the newly added section with the addons we're looking for 
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118170010.png)

Select 'rtl_433' and install it
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118170010.png)

Once installed, hit start
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118170047.png)

### Section 3: MQTT Explorer and Device Discovery

MQTT Explorer is a really handy tool when trying to get some visibility into what the radio is seeing. In this section, I'll be using it to make sure I'm able to find my devices.

You can download MQTT Explorer here: https://mqtt-explorer.com/

![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118171726.png)

Open up MQTT Explorer, and connect to your HA instance. Since I'm serving mine from a physical device with a pretty standard network setup, I'm able to use the homeassistant.local url instead of an IP address. For the username and password, you can use the same credentials that you'd use to log into HA. Ensure 'Validate certificate' and 'Encryption (tls)' are off. 

![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118171941.png)
Once in, you'll see a few entries depending on what you have installed. We're going to dive into the rtl_433 entry. 

![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118172405.png)
Here, with default settings, is my indoor temperature sensor that I have, since it transmits to the default frequency of 433 MHz

### Section 4: Other Frequencies
Next, I'm going to change the frequency that rtl_433 is looking at. To do this, I'll need to edit the config file. 

![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118173413.png)
I'll be using this Terminal & SSH addon that's available from the official addons section in the addon store. You can access the terminal by clicking 'Open Web UI' next to the uninstall button.

Once in the terminal, type 'nano config/rtl_433/rt1_433. conf.tenplate' and press enter. You should then see a screen similar to the one pictured below: 
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118174419.png)

Once there, you can change the frequency and protocol that you're looking for. For me, I'm looking for my door sensors, so I will change my protocol to 70 and frequency to 345M
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118175529.png)

I'm going to hit control+X, then Y, then enter to save. 

Restart the rtl_433 addon to reload the config. 

Looking back into MQTT Explorer, I can now see 'Honeywell-Security'. In there, I can see both of my door sensors under the channel 10:
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118183545.png)

### Section 5: Device Auto-Discovery

In the HA addon store, I'm now going to install the rtl_433 MQTT Auto Discovery addon:
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118183736.png)

This will (hopefully) make devices discovered by rtl_433 devices in HA. 

After installing and starting the addon, I'll take a look at the MQTT devices to see if they were found successfully:
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118184040.png)
So far, so good. Both of the sensors are there. 

After clicking on one, I've found that the right data isn't available right off the bat, with the major piece missing being the actual door status of the sensor (open/closed)

![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118184201.png)


### Section 6: Manual Device Entries
Since auto-discovery didn't do the trick, I'm going to add the devices to HA automatically using the configuration files. First, I'm going to make sure the rtl-433 auto-discovery plugin is stopped since I don't want broken instances cluttering up my HA. I'm then going to delete both of the broken instances from MQTT. 

Back in MQTT Explorer, I'm going to be taking a closer look at one of the sensors to see which variable that's available is what I'm looking for:
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118184606.png)

I've narrowed it down to the 'reed_open' variable. If the door is open, it will be equal to 1, and vice-versa. 

Back in the terminal, I'm now going to edit a different configuration file, located at `/config/configuration.yaml`. You can edit this file by typing `nano /config/configuration.yaml` into the terminal from the home directory (which you should already be at when opening the terminal). 

#### Tech tip:
If you ever get lost, type `cd ~` to return to the home directory.

To add the sensors to HA manually, I'm going to be following the binary sensor mqtt guide here: https://www.home-assistant.io/integrations/binary_sensor.mqtt/

Here is the configuration I ended up with:
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118202346.png)

Once I saved this configuration, I went to the 'Developer Tools' panel (right above settings) and reloaded the configuration file.
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118202450.png)


Finally, after reloading, I navigated to the entities section of HA to search for my sensor, and there it is!
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118203125.png)


After messing around with it for a bit, I'm pretty happy with how it turned out:
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118203229.png)

Then, by pressing the gear icon at the top of this context menu, I renamed the sensor to be more clear:
![](https://storage.googleapis.com/colepattersonhomelab.appspot.com/pagesimages/ha_rtl433/Pasted%20image%2020231118203337.png)

