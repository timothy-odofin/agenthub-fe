export const sampleChats =[
     {
    id: '1',
    title: 'Python code review',
    createdAt: new Date(2023, 6, 15),
    messages: [
      {
        id: '1-1',
        sender: 'user',
        content: 'Can you review this Python code for me?',
        timestamp: new Date(2023, 6, 15, 14, 30),
      },
      {
        id: '1-2',
        sender: 'assistant',
        content: 'Of course! I\'d be happy to review your Python code. Please share the code you\'d like me to look at.',
        timestamp: new Date(2023, 6, 15, 14, 31),
      },
      {
        id: '1-3',
        sender: 'user',
        content: 'It\'s a function to calculate Fibonacci numbers:\n\n```python\ndef fib(n):\n    if n <= 1:\n        return n\n    else:\n        return fib(n-1) + fib(n-2)\n```',
        timestamp: new Date(2023, 6, 15, 14, 33),
      },
    ],
  },
  {
    id: '2',
    title: 'UX design principles',
    createdAt: new Date(2023, 6, 14),
    messages: [
      {
        id: '2-1',
        sender: 'user',
        content: 'What are the most important UX design principles?',
        timestamp: new Date(2023, 6, 14, 10, 15),
      },
      {
        id: '2-2',
        sender: 'assistant',
        content: 'The most important UX design principles include:\n\n1. User-centered design\n2. Consistency\n3. Hierarchy\n4. Context\n5. Accessibility',
        timestamp: new Date(2023, 6, 14, 10, 16),
      },
    ],
  },
  {
    id: '3',
    title: 'Travel recommendations',
    createdAt: new Date(2023, 6, 13),
    messages: [
      {
        id: '3-1',
        sender: 'user',
        content: 'I\'m planning a trip to Japan next month. Any recommendations?',
        timestamp: new Date(2023, 6, 13, 16, 45),
      },
      {
        id: '3-2',
        sender: 'assistant',
        content: 'Japan is wonderful! Here are some must-visit places:\n\n- Tokyo: Senso-ji Temple, Shibuya Crossing\n- Kyoto: Fushimi Inari Shrine, Arashiyama Bamboo Grove\n- Osaka: Osaka Castle, Dotonbori food district',
        timestamp: new Date(2023, 6, 13, 16, 46),
      },
    ],
  },
]