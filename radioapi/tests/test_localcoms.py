from radioapi.coms import ComsSubscription, LocalComsDriver

import time


def main():
    print("Hello World")
    lc1, lc2 = LocalComsDriver.create_linked_coms()
    print(lc1)
    print(lc2)
    lc1_subsciption = ComsSubscription(
        lambda m: print(f"Local Coms 1 recieved message: {m}")
    )
    lc2_subsciption = ComsSubscription(
        lambda m: print(f"Local Coms 2 recieved message: {m}")
    )

    lc1.register_subscriber(lc1_subsciption)
    lc2.register_subscriber(lc2_subsciption)

    lc1.start_read_loop()
    lc2.start_read_loop()

    lc1.write(
        {
            "ABORT": 1,
            "QDM": 2,
            "STAB": 3,
            "LAUNCH": 4,
            "ARMED": 5,
            "DATA": {"msg": "lc1 -> lc2 (1)"},
        }
    )
    lc2.write(
        (
            "{"
            '"ABORT": 1,'
            '"QDM": 2,'
            '"STAB": 3,'
            '"LAUNCH": 4,'
            '"ARMED": 5,'
            '"DATA": {"msg": "lc1 <- lc2 (2)"}'
            "}"
        )
    )

    time.sleep(3)
    lc1.write(
        {
            "ABORT": 1,
            "QDM": 2,
            "STAB": 3,
            "LAUNCH": 4,
            "ARMED": 5,
            "DATA": {"msg": "lc1 -> lc2 (3)"},
        }
    )
    lc1.write(
        {
            "ABORT": 1,
            "QDM": 2,
            "STAB": 3,
            "LAUNCH": 4,
            "ARMED": 5,
            "DATA": {"msg": "lc1 -> lc2 (4)"},
        }
    )
    print(f"Local Coms 2 Recieve inline {lc2.read()}")
    print(f"Local Coms 2 Recieve inline {lc2.read()}")

    lc1.write(
        {
            "ABORT": 1,
            "QDM": 2,
            "STAB": 3,
            "LAUNCH": 4,
            "ARMED": 5,
            "DATA": {"msg": "lc1 -> lc2 (5)"},
        }
    )
    time.sleep(3)
    print("done")


if __name__ == "__main__":
    main()
