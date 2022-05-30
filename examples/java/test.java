import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class ChallengeTests {
  @Test
  public void test1() {
    assertEquals(1, Challenge.pentagonal(1));
  }

	@Test
  public void test2() {
    assertEquals(16, Challenge.pentagonal(3));
  }

	@Test
  public void test3() {
    assertEquals(141, Challenge.pentagonal(8));
  }

	@Test
  public void test4() {
    assertEquals(226, Challenge.pentagonal(10));
  }

	@Test
  public void test5() {
    assertEquals(526, Challenge.pentagonal(15));
  }

	@Test
  public void test6() {
    assertEquals(2641, Challenge.pentagonal(33));
  }

	@Test
  public void test7() {
    assertEquals(4516, Challenge.pentagonal(43));
  }

	@Test
  public void test8() {
    assertEquals(391, Challenge.pentagonal(13));
  }

	@Test
  public void test9() {
    assertEquals(6126, Challenge.pentagonal(50));
  }

	@Test
  public void test10() {
    assertEquals(9456, Challenge.pentagonal(62));
  }

	@Test
  public void test11() {
    assertEquals(1051, Challenge.pentagonal(21));
  }
}
