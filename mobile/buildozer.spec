[app]

# (str) Title of your application
title = Codecart

# (str) Package name
package.name = codecart

# (str) Package domain (needed for android/ios packaging)
package.domain = io.codecart

# (str) Source code where the main.py live
source.dir = .

# (str) Application versioning
version = 0.1

# (str) Name of the main Python file
source.main_py = mobile_app.py

# (list) Source files to include (let empty to include all the files)
source.include_exts = py,png,jpg,kv,atlas

# (list) Application requirements
# comma separated e.g. requirements = sqlite3,kivy
requirements = python3,kivy,requests

# (list) Supported orientations
orientation = portrait

# (bool) Indicate if the application should be fullscreen or not
fullscreen = 0

#
# Android specific
#

# (list) Permissions
android.permissions = INTERNET

# (int) Target Android API, should be as high as possible.
android.api = 31

# (int) Minimum API your APK / AAB will support.
android.minapi = 21

# (list) The Android archs to build for
android.archs = arm64-v8a, armeabi-v7a


[buildozer]
log_level = 2
warn_on_root = 1