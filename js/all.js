$(function () {
    $('.search').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            type: 'GET',
            url: 'https://data.kaohsiung.gov.tw/Opendata/DownLoad.aspx?Type=2&CaseNo1=AE&CaseNo2=2&FileType=1&Lang=C&FolderType=',
            success: function (data) {
                var thisData = JSON.parse(data);
                var map;
                infowindow = new google.maps.InfoWindow();
                marker = [];
                $('.list').html('');
                /////end select
                for (i = 0; i < thisData.length; i++) {
                    if ($('#free').val() === thisData[i].informaddress.substr(3, 3)) {
                        var latlng = new google.maps.LatLng(thisData[i].lat, thisData[i].lng);
                        var myOptions = {
                            zoom: 13,
                            center: latlng
                        };
                    } else if ($('#free').val() === '全區') {
                        var latlng = new google.maps.LatLng(thisData[i].lat, thisData[i].lng);
                        var myOptions = {
                            zoom: 10,
                            center: latlng
                        };
                    }

                } ///end for

                map = new google.maps.Map($("#map")[0], myOptions); // End of default google map

                for (i = 0; i < thisData.length; i++) {
                    area = thisData[i].informaddress.substr(3, 3);
                    name = thisData[i].org_Text;
                    address = thisData[i].informaddress;
                    caseSN = thisData[i].servItem;
                    time = thisData[i].servTime;
                    phone = thisData[i].informtel;
                    if ($('#free').val() === area) {

                        //addmarkers
                        marker[i] = new google.maps.Marker({
                            position: new google.maps.LatLng(thisData[i].lat, thisData[i].lng),
                            map: map,
                            animation: google.maps.Animation.DROP,
                            title: name,
                            address,
                            time,
                            phone,
                            caseSN
                            
                        });
                        // Open infowindow event    
                        google.maps.event.addListener(marker[i], 'click', function () {
                            showInfo(map, this);
                        }); // End of area addListener
                    } 


                     if ($('#free').val() === '全區') {
                        marker[i] = new google.maps.Marker({
                            position: new google.maps.LatLng(thisData[i].lat, thisData[i].lng),
                            map: map,
                            animation: google.maps.Animation.DROP,
                            title: name,
                            address,
                            time,
                            phone,
                            caseSN
                            
                        });
                        google.maps.event.addListener(marker[i], 'click', function () {
                            showInfo(map, this);
                        }); // End of area addListener
                    }; //end of else if
                    showInfo = function (mapObj, markerObj) { // Open infowindow function
                        infowindow.setContent(infoContent(markerObj));
                        infowindow.open(mapObj, markerObj);
                    } // End of showInfo
                    var infoContent = function (markerObj) { // Setting infowindow content function
                        html = '<ul id="' + markerObj.caseSN + '" style="list-style:none;   font-size:20px;      font-family: Microsoft JhengHei, arial; "><h1 style=" margin:10px; font-size:30px;   font-weight: bold;">' + markerObj.title + '</h1>';
                        html += '<li style="    ">詳細位置: ' + '<p>'+markerObj.address+'</p>' + '</li>';
                        html += '<li style="    ">開放時間: ' + '<p>'+markerObj.time+'</p>' + '</li>';
                        html += '<li style="    ">連絡電話: ' + '<p>'+markerObj.phone+'</p>' + '</li></ul>';
                        return html;

                    } // End of infoContent
                }
            } //end success
        })
    });
});
