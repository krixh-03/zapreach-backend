import { useState, useEffect } from 'preact/hooks';

type Feedback = {
  feedback: string;
  upvotes: number;
};

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  async function fetchFeedbacks() {
    const res = await fetch('http://localhost:8787/feedback');
    const data = await res.json();
    if (data.success) {
      setFeedbacks(data.feedbacks);
    }
  }

  async function handleUpvote(index: number) {
    const feedback = feedbacks[index];

    const upvoted = JSON.parse(localStorage.getItem('upvotedFeedbacks') || '[]');

    if (upvoted.includes(feedback.feedback)) {
      alert('You have already upvoted this feedback!');
      return;
    }

    const newFeedbacks = [...feedbacks];
    newFeedbacks[index].upvotes += 1;
    setFeedbacks(newFeedbacks);

    localStorage.setItem(
      'upvotedFeedbacks',
      JSON.stringify([...upvoted, feedback.feedback])
    );

    await fetch('http://localhost:8787/feedback/upvote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedback: feedback.feedback }),
    });
  }

  async function submitFeedback(e: Event) {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    const res = await fetch('http://localhost:8787/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedback: text }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setMessage('Thanks for your feedback!');
      setText('');
      fetchFeedbacks();
    } else {
      setMessage(data.message || 'Something went wrong.');
    }
  }

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div class="max-w-2xl mx-auto px-6 py-10">
      <h1 class="text-4xl font-extrabold mb-8 text-center text-white">Leave your <span class="text-yellow-400">feedback</span></h1>

      <form onSubmit={submitFeedback} class="mb-10">
        <textarea
          class="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
          rows={4}
          placeholder="What's on your mind?"
          value={text}
          onInput={(e) => setText((e.target as HTMLTextAreaElement).value)}
        />
        <button
          type="submit"
          class="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit ↗'}
        </button>
      </form>

      {message && (
        <p class="mb-6 text-center text-green-600 font-medium">{message}</p>
      )}

      <h2 class="text-2xl font-bold mb-6 text-white">Community Feedback</h2>

      <div class="space-y-5">
        {feedbacks.length === 0 && (
          <p class="text-center text-gray-500">No feedback yet. Be the first!</p>
        )}

        {feedbacks.map((fb, index) => (
          <div
            key={index}
            class="flex items-start justify-between p-5 border border-yellow-500 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <p class="w-4/5 text-white">{fb.feedback}</p>

            <div class="flex flex-col items-center justify-center space-y-1">
              <button
                onClick={() => handleUpvote(index)}
                class="text-gray-400 hover:text-blue-600 transition-transform transform hover:scale-125"
              >
                ⬆️
              </button>
              <span class="text-sm text-white">Upvotes: {fb.upvotes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
