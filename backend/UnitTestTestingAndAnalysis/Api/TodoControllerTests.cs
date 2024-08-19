using System;
using System.Threading.Tasks;
using FS.Todo.Api.Controllers;
using FS.Todo.Api.Models;
using FS.Todo.Core.Interfaces;
using FS.Todo.Core.Models;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Xunit;

namespace FS.Todo.Tests.Api
{
    public class TodoControllerTests
    {
        [Fact]
        public async Task GetTodo_ReturnsNotFoundResult_WhenTodoIsNotFound()
        {
            // Arrange
            var todoService = Substitute.For<ITodoService>();
            var todoController = new TodoController(todoService);

            var todoId = Guid.NewGuid();
            todoService.GetTodoAsync(todoId).Returns(Task.FromResult<TodoModel>(null));

            // Act
            var result = await todoController.GetTodoAsync(todoId);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task GetTodo_ReturnsOkResult_WhenTodoIsFound()
        {
            // Arrange
            var todoService = Substitute.For<ITodoService>();
            var todoController = new TodoController(todoService);

            var todo = new TodoModel
            {
                Id = Guid.NewGuid(),
                Description = "test todo",
                IsCompleted = false,
            };

            todoService.GetTodoAsync(todo.Id).Returns(Task.FromResult(todo));

            // Act
            var result = await todoController.GetTodoAsync(todo.Id);

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task UpdateTodo_ReturnsNoContentResult_WhenTodoIsUpdated()
        {
            // Arrange
            var todoService = Substitute.For<ITodoService>();
            var todoController = new TodoController(todoService);

            var todoId = Guid.NewGuid();
            var updateTodoModel = new UpdateTodoModel
            {
                Id = todoId,
                Description = "Updated Todo",
                IsCompleted = true
            };

            var existingTodo = new TodoModel
            {
                Id = todoId,
                Description = "Old Todo",
                IsCompleted = false
            };

            todoService.GetTodoAsync(todoId).Returns(Task.FromResult(existingTodo));

            // Act
            var result = await todoController.UpdateTodoAsync(todoId, updateTodoModel);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteTodo_ReturnsNoContentResult_WhenTodoIsDeleted()
        {
            // Arrange
            var todoService = Substitute.For<ITodoService>();
            var todoController = new TodoController(todoService);

            var todoId = Guid.NewGuid();
            var existingTodo = new TodoModel
            {
                Id = todoId,
                Description = "Existing Todo",
                IsCompleted = false
            };

            todoService.GetTodoAsync(todoId).Returns(Task.FromResult(existingTodo));

            // Act
            var result = await todoController.DeleteTodoAsync(todoId);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }
    }
}
