<?php

function addContentList(){

    $activity = get_activity();

    foreach ($activity as $key => $currentList) {
       
        $currentdata = strtotime($currentList['data']);
        $data = date('F j', $currentdata);

        $distance = $currentList['distance'];
        $action = $currentList['action'];

        $starttime = strtotime($currentList['starttime']);
        $finishtime = strtotime($currentList['finishtime']);

        $subtracttime = $finishtime - $starttime;
        $coefficient = $subtracttime / 60 / 60;

        $distancelist = round($distance / $coefficient, 2);

        if($coefficient < 1){
            $fulltimeList = date('i', $currentdata + $subtracttime)." minutes" ;
        }elseif($coefficient == round($coefficient)){
            $fulltimeList = date('G', $currentdata + $subtracttime)." hour";
        }else{
            $fulltimeList = date('G', $currentdata + $subtracttime)." h ".date('i', $currentdata + $subtracttime)." m" ;
        }    

        echo('<div class="elList">
        
            <table>
            <tr>
                <td>
                    '.$data.'
                </td>
                <td>
                    '.$action.'
                </td>
                <td>
                    '.$distance.' km
                </td>
                <td>
                    '.$fulltimeList.' 
                </td>
                <td>
                    '.$distancelist.' km / hour
                </td>
            </tr>
            </table>

        </div>');

    }

}

function addLongestActivity(){

    $activity = get_longest_activity();

    foreach ($activity as $key => $currentList) {

        $currentdata = strtotime($currentList['data']);
        $data = date('M j', $currentdata);

        $distance = $currentList['distance'];
        $action = $currentList['action'];

        $starttime = strtotime($currentList['starttime']);
        $finishtime = strtotime($currentList['finishtime']);

        $subtracttime = $finishtime - $starttime;
        $coefficient = $subtracttime / 60 / 60;

        // $distancelist = round($distance / $coefficient, 2);

        if($coefficient < 1){
            $fulltimeList = date('i', $currentdata + $subtracttime)." m" ;
        }elseif($coefficient == round($coefficient)){
            $fulltimeList = date('G', $currentdata + $subtracttime)." h";
        }else{
            $fulltimeList = date('G', $currentdata + $subtracttime)." h ".date('i', $currentdata + $subtracttime)." m" ;
        }    

        echo('
        <div>
            Longest '.$action.':
            <table>
            <tr>
                <td>
                '.$data.'
                </td>
                <td>
                '.$distance.' km
                </td>
                <td>
                '.$fulltimeList.' 
                </td>
            </tr>
            </table>
        </div>
        ');

    }

}

function addTotalStatic(){

    $activity = get_total_static();

    $k=1;
    foreach ($activity as $key => $currentList) {

        $distance = $currentList['distance'];
        $action = $currentList['action'];

        if($k > 1){
            echo('<br>');    
        }

        echo('Total '.$action.' distance: <span id="totalRide">'.$distance.' km</span>');

        $k +=1;
    }

}

?>