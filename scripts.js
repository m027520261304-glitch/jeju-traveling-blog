document.addEventListener('DOMContentLoaded', () => {
  // 슬라이드 기능
  const slides = document.querySelectorAll('.slideshow img');
  let currentSlideIndex = 0;
  function showNextSlide() {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    slides[currentSlideIndex].classList.add('active');
  }
  setInterval(showNextSlide, 3000);

  // 게시글 작성
  document.getElementById('submit-btn').addEventListener('click', () => {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    if (!title || !content) return alert('입력해주세요.');
    
    const div = document.createElement('div');
    div.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
    document.getElementById('post-container').appendChild(div);
    
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
  });
});

// 일정 상세 정보 표시
function showDetail(day, time, activity) {
  alert(`[${day} ${time}]\n할 일: ${activity}`);
}

// 챗봇 기능
function chatGPT() {
  const api_key = "YOUR_API_KEY_HERE"; // 실제 사용 시 발급받은 API KEY를 넣으세요
  const keywords = document.getElementById('keywords').value;
  if (!keywords) return alert("질문을 입력하세요.");
  
  $('#loading').show();
  $.ajax({
    url: "https://api.openai.com/v1/chat/completions",
    method: 'POST',
    headers: { 
        "Authorization": "Bearer " + api_key, 
        'Content-Type': 'application/json' 
    },
    data: JSON.stringify({ 
      model: 'gpt-3.5-turbo', 
      messages: [{ role: 'user', content: keywords + '에 대해 답변해줘.' }] 
    }),
  }).then(res => {
    $('#loading').hide();
    $('#result').html(`<pre>${res.choices[0].message.content}</pre>`);
  }).catch(() => {
    $('#loading').hide();
    alert('에러가 발생했습니다. API Key를 확인하세요.');
  });
}