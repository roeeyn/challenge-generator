from typing import Any
from typing import Optional


class Test:
    @staticmethod
    def assert_equals(
        executed_value: Any, expected_value: Any, error_message: Optional[str]
    ):
        """Asserts that the executed value is equal to the expected value.

        Check if the executed value is equal to the expected value.

        Args:
            executed_value(Any): The value that was executed.
            expected_value(Any): The value that was expected.
            error_message(Optional[str]): The error message that should be
                displayed if assertion fails.
        """
        assert executed_value == expected_value, error_message
