Test.assert_equals(validate_binary('00101101'), True)
Test.assert_equals(validate_binary('11000000'), True)
Test.assert_equals(validate_binary('11000001'), False)
Test.assert_equals(validate_binary('10010010'), False)
