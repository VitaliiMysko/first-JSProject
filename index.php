<?php
require_once 'app/header.php';
?>

    <form id="maneForm" method="POST" action="">
      <div id="actionPanel">
          Add new activity:

          <input name="startTime" type="text" onkeydown="return checkTimeKey(event.key)" id="startTime"  class="timeAction" placeholder="Start time (12:00)">
        
          <input name="finishTime" type="text" onkeydown="return checkTimeKey(event.key)" id="finishTime" class="timeAction" placeholder="Finish time (13:00)">

          <input name="distance" type="text" onkeydown="return checkDistanceKey(event.key)" id="distance" placeholder="Distance,km">

          <?php $actions = get_actions();?>
          <select name="action">
          <?php foreach ($actions as $action): ?>
            <option><?=$action['name']?></option>
          <?php endforeach; ?>
          </select>         

          <input type="submit" class="buttonForm" disabled value="save">
      </div>
    </form>

    <div>

        <div id="listDiv">
          <?php addContentList(); ?>
        </div>        

        <div id="rightBlock">

          <div id="statisticDiv">
            <?php addLongestActivity() ?>
          </div>

          <div id="totalStatisticDiv">
            <?php addTotalStatic() ?>
          </div>
          
        </div>
    </div>
</div>


<?php
require_once 'app/footer.php';
?>