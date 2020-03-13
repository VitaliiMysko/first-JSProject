<?php

function create_activity(){

    global $link;

    if(!count($_POST)){
        return;
    }

    $data = date('Y-m-d',time());
    $starttime = $_POST['startTime'];
    $finishtime = $_POST['finishTime'];
    $distance = $_POST['distance'];
    $name_action = $_POST['action'];


    if($starttime == "" || $finishtime == "" || $starttime == NULL || $finishtime == NULL){
        return; 
    }

    $name_action = get_actions($name_action);

    foreach ($name_action as $action){
        $id_action = $action['id'];
        break;
    }
    
    $data = date('Y-m-d');
    $starttime = $data." $starttime".":00";
    $finishtime = $data." $finishtime".":00";

    $sql = "INSERT INTO activity
                (
                 data,
                 starttime,
                 finishtime,
                 distance,
                 id_action)
                 VALUES
                 (
                     '$data',
                     '$starttime',
                     '$finishtime',
                     '$distance',
                     '$id_action'
                 )
                  ";

    return mysqli_query($link, $sql);

}

function get_actions($name=""){

    global $link;
    
    if($name <> ""){
        $sql = "SELECT
                    actions.id,  
                    actions.name 
                FROM actions 
                WHERE actions.name = '$name'";
    }else{
        $sql = "SELECT
                    actions.id,  
                    actions.name 
                FROM actions 
                ORDER BY actions.name";
    }

    $result = mysqli_query($link, $sql);

    return mysqli_fetch_all($result, MYSQLI_ASSOC);

}

function get_activity(){

    global $link;

    $sql = "SELECT
                activity.id, 
                 activity.data,
                 activity.starttime,
                 activity.finishtime,
                 activity.distance,
                 actions.name AS action
            FROM activity 
            JOIN actions
                ON activity.id_action = actions.id
            ORDER BY 
                id DESC";

    $result = mysqli_query($link, $sql);

    return mysqli_fetch_all($result, MYSQLI_ASSOC);

}

function get_longest_activity(){

    global $link;

   $sql = "SELECT 
            activity.id, 
            activity.data, 
            activity.starttime, 
            activity.finishtime, 
            activity.distance,
            activity.id_action,
            actions.name AS action 
        FROM activity
        JOIN (
            SELECT 
                MAX(id) AS id, 
                distance,
                id_action
            FROM activity
            WHERE (distance, id_action) IN (
                SELECT 
                    MAX(distance) AS distance,
                    id_action
                FROM activity
                GROUP BY id_action)
            GROUP BY 
                distance, 
                id_action) AS tablefilter
        ON activity.id = tablefilter.id
            AND activity.distance = tablefilter.distance
            AND activity.id_action = tablefilter.id_action
        JOIN actions
        ON activity.id_action = actions.id
        ORDER BY actions.name
        ";

    $result = mysqli_query($link, $sql);

    return mysqli_fetch_all($result, MYSQLI_ASSOC);

}

function get_total_static(){

    global $link;

    $sql = "SELECT 
                tabletotal.distance,
                actions.name AS action
            FROM (
                SELECT 
                    SUM(distance) AS distance,
                    id_action
                FROM activity 
                GROUP BY id_action) AS tabletotal
            JOIN actions
            ON tabletotal.id_action = actions.id
            ORDER BY actions.name
            ";

    $result = mysqli_query($link, $sql);

    return mysqli_fetch_all($result, MYSQLI_ASSOC);

}






?>