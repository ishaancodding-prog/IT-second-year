<style>
  .card-container { perspective: 1000px; margin-bottom: 15px; }
  .card { width: 300px; height: 150px; position: relative; transform-style: preserve-3d; transition: transform 0.6s; cursor: pointer; }
  .card.is-flipped { transform: rotateY(180deg); }
  .card-front, .card-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; padding: 15px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 8px; background: #fff; }
  .card-back { transform: rotateY(180deg); background: #f9f9f9; }
</style>

<div class="card-container" onclick="this.querySelector('.card').classList.toggle('is-flipped')">
  <div class="card">
    <div class="card-front">
      <strong>Monday: 10:00 - 11:00</strong><br>Data Structures and Algorithms
    </div>
    <div class="card-back">
      Location: IT-202
    </div>
  </div>
</div>

<div class="card-container" onclick="this.querySelector('.card').classList.toggle('is-flipped')">
  <div class="card">
    <div class="card-front">
      <strong>Monday: 12:00 - 13:00</strong><br>Foundations of Information Technology
    </div>
    <div class="card-back">
      Location: IT-204
    </div>
  </div>
</div>
