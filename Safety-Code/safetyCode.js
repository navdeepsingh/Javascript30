function audiSafetyCode() {
    this.limit = 20,
    this.warned = !1,
    this.speedTimeout = !1,
    this.watch_id = null,
    this.last_check = 0,
    this.last_lat = 0,
    this.last_lng = 0,
    this.speeds = [],
    this.position_handler = function (t) {
        asked = !1;
        var o,
            e,
            i = Date.now();
        if (this.last_lat != t.coords.latitude || this.last_lng != t.coords.longitude) {
            var a = this.distance(t.coords.latitude, t.coords.longitude);
            e = (o = (0 === this.last_check ? 0 : (i - this.last_check) / 1e3) / 3600) > 0 && a > 0 ? Math.floor(a / o) : 0, totDist += a, this.speeds.length > 0 && e > this.speeds[this.speeds.length - 1] + 20 && (e = this.speeds[this.speeds.length - 1] + 20), this.speeds.push(e);
            var s = 0;
            if (this.speeds.length >= avgCount) {
                for (var n = this.speeds.slice(this.speeds.length - avgCount, this.speeds.length), l = 0, d = 0;
                    d < n.length;
                    d++)l += n[d];
                (s = l / n.length) >= this.limit && e >= this.limit && !this.warned && this.speed_alert(),
                    s <= 1 && (this.warned = !1)
            }
            this.last_check = i,
                this.last_lat = t.coords.latitude,
                this.last_lng = t.coords.longitude
        }
    }
    .bind(this),
    this.speed_alert = function () {
        if (this.warned = !0, !document.getElementById("speed-alert")) {
            var t = document.createElement("div");
            t.innerHTML = '<div id="speed-alert" class="modal"><div class="modal-content"><img class="lock" src="https://safetycode.se/eng/popup/images/lock.png" width="52" alt=""><img class="text-top" src="https://safetycode.se/eng/popup/images/text-top.png" width="187" alt=""><img class="text-button" src="https://safetycode.se/eng/popup/images/button.png" width="160" alt=""><img class="text-bottom" src="https://safetycode.se/eng/popup/images/text-bottom.png" width="95" alt=""></div></div><div class="modal-overlay"></div>' + "<style>.modal{display: block !important;bottom: auto;overflow: visible;border: 0;border-radius: 0 !important;font-family:'AudiType ExtendedNormal';font-size:10px;position:fixed;top:50%;left:50%;-ms-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:100%;max-width:262px;background:#fff;text-align:center;box-shadow:0 0 10px rgba(0,0,0,.3);z-index:999999}.modal-content > img {margin-left: auto; margin-right: auto; display: inline-block !important; }.modal h2,.modal strong{font-family:'AudiType ExtendedBold'}.modal-content{padding:30px 35px 17px;    text-align: center !important;border-radius: 0 !important;}}.modal p{margin-top:0}.modal strong{font-weight:400}.modal h2{font-size:18px;margin-top:24px;margin-bottom:10px}.modal .button{display:inline-block;background:#bb0a30;color:#fff;height:37px;line-height:37px;padding:0 25px;text-decoration:none;margin-top:25px;margin-bottom:40px;cursor:pointer}.modal .bottom{font-size:8px;margin-bottom:0}.lock{margin-bottom:30px}.text-top{margin-bottom:35px}.text-button{margin-bottom:45px}.modal-overlay{display:block;background-color:rgba(0, 0, 0, 0.5);position:fixed;top:0;left:0;width:100%;height:100%;z-index:999998}</style>",
                document.body.appendChild(t)
        }
        document.querySelector(".text-button").onclick = function () {
            document.querySelector(".modal").remove(),
                document.querySelector(".modal-overlay").remove()
        }
    }
    ,
    this.geo_error = function (t) {
        switch (asked = !1, t.code) {
            case t.PERMISSION_DENIED: localStorage.setItem("allow_geolocation", "false")
        }
    }
    ,
    this.distance = function (t, o) {
        if (0 === this.last_lat || 0 === this.last_lng) return 0;
        var e = Math.PI * t / 180,
            i = Math.PI * this.last_lat / 180,
            a = o - this.last_lng,
            s = Math.PI * a / 180,
            n = Math.sin(e) * Math.sin(i) + Math.cos(e) * Math.cos(i) * Math.cos(s);
        return n = Math.acos(n),
            n = 180 * n / Math.PI,
            n = 60 * n * 1.1515,
            n *= 1.609344
    }
    ,
    this.geo_options = {
        enableHighAccuracy: !0, maximumAge: 0, timeout: 1e4
    }
    ,
    this.run = function () {
        if (!(!1 in navigator)) {
            var t = this;
            "false" !== localStorage.getItem("allow_geolocation") ? window.setInterval(function () {
                asked || "false" === localStorage.getItem("allow_geolocation") || (asked = !0, navigator.geolocation.getCurrentPosition(t.position_handler, t.geo_error, t.geo_options))
            }
                , updateInterval) : console.log("True")
        }
    }
}

"https:" != location.protocol && (location.href = "https:" + window.location.href.substring(window.location.protocol.length));
var updateInterval = 1e3,
    avgCount = 5,
    totDist = 0,
    asked = !1;