# ToDo (Composite pattern, `C#` 버전)

```cs
namespace ToDoConsole
{
    class Task
    {
        public string Title { get; private set; }
        public DateTime Date { get; private set; }
        public bool IsComplete { get; private set; }

        public Task(string title, DateTime date)
        {
            Title = title;
            Date = date;
            IsComplete = false;
        }

        public void Toggle()
        {
            IsComplete = !IsComplete;
        }

        public void PrintTask()
        {
            WriteLine(Title);
        }
    }

    class TaskList
    {
        public string Title { get; private set; }
        private List<Task> list = new List<Task>();

        public TaskList(string title)
        {
            Title = title;
        }

        public void Add(string title)
        {
            list.Add(new Task(title, DateTime.Now));
        }

        public void Remove(Task task)
        {
            if (list.Contains(task))
                list.Remove(task);
        }

        public void PrintTaskList()
        {
            WriteLine(Title);
            foreach (var task in list)
                task.PrintTask();
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            TaskList list1 = new TaskList("Task1");
            list1.Add("지라설치");
            list1.Add("지라클라우드접속");

            TaskList list2 = new TaskList("Task2");
            list2.Add("2강");
            list2.Add("3강");

            list1.PrintTaskList();
            list2.PrintTaskList();
        }
    }
}
```