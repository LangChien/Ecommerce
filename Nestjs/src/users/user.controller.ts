import { ResponseMessage } from '@/decorator/customize'
import { PaginationQuery, ParamIdDto, QueryIdsDto } from '@/lib/query-helper'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { IUsersController } from './abstract'
import { CreateUserDto, UpdateUserDto } from './dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController implements IUsersController {
  constructor(private readonly userService: UserService) {}

  @ResponseMessage('Tạo mới user thành công')
  @Post()
  create(@Body() data: CreateUserDto): Promise<any> {
    const { email, name, password, avatar, phone, roleId, status } = data
    return this.userService.create({ email, name, password, avatar, phone, roleId, status })
  }

  @ResponseMessage('Xóa mềm user thành công')
  @Delete('soft-delete/:id')
  softDelete(@Param() { id }: ParamIdDto): Promise<any> {
    return this.userService.softDelete(id)
  }

  @ResponseMessage('Xóa user thành công')
  @Delete(':id')
  delete(@Param() { id }: ParamIdDto): Promise<any> {
    return this.userService.delete(id)
  }

  @ResponseMessage('Xóa user thành công')
  @Delete()
  deleteMany(@Query() { ids }: QueryIdsDto): Promise<any> {
    return this.userService.deleteMany(ids)
  }

  @ResponseMessage('Get all users successfully')
  @Get()
  findMany(@Query() query: PaginationQuery): Promise<any> {
    return this.userService.findMany(query)
  }

  @ResponseMessage('Get user by id successfully')
  @Get(':id')
  findOne(@Param() { id }: ParamIdDto): Promise<any> {
    return this.userService.findOne(id)
  }

  @ResponseMessage('Cập nhật user thành công')
  @Patch(':id')
  update(@Param() { id }: ParamIdDto, @Body() data: UpdateUserDto): Promise<any> {
    const { avatar, name, phone, status } = data
    return this.userService.update(id, { avatar, name, phone, status })
  }
}
