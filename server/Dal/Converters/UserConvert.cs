
using Dal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Converters
{
  class UserConvert
  {

    public static User UserToModel(Entities.Users UserEntity)
    {
      return new User()
      {
        id = (int)UserEntity.id,
        firstName = UserEntity.firstName,
        lastName = UserEntity.lastName,
        mail = UserEntity.mail,
        hmoId = (int)UserEntity.hmoId,
        password = UserEntity.password,
        tz = UserEntity.tz
      };

    }

    public static Entities.Users UserToEntity(User userModel)
    {
      Entities.Users employee = new Entities.Users()
      {
        id = userModel.id,
        firstName = userModel.firstName,
        lastName = userModel.lastName,
        mail = userModel.mail,
        hmoId = userModel.hmoId,
        password = userModel.password,
        tz = userModel.tz
      };
      return employee;
    }

  }
}
